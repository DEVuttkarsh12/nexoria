const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');

// Small browser stand-ins let us check deadlines and failure paths without real sleeps.
function browser({repeat=false, reduced=false, loaded=false, storageBlocked=false}={}) {
  let now=0, nextId=0;
  const timers=new Map();
  const events=()=>({listeners:new Map(),addEventListener(type,fn){if(!this.listeners.has(type))this.listeners.set(type,new Set());this.listeners.get(type).add(fn);},removeEventListener(type,fn){this.listeners.get(type)?.delete(fn);},dispatchEvent(event){for(const fn of [...(this.listeners.get(event.type)||[])])fn(event);}});
  let doc;
  const element=()=>Object.assign(events(),{
    inert:false,isConnected:true,attributes:new Map(),dataset:{},textContent:'',
    classList:{values:new Set(),add(...values){values.forEach(v=>this.values.add(v));},remove(...values){values.forEach(v=>this.values.delete(v));},contains(value){return this.values.has(value);}},
    style:{setProperty(name,value){this[name]=value;}},
    setAttribute(name,value){this.attributes.set(name,value);},removeAttribute(name){this.attributes.delete(name);},
    focus(){doc.activeElement=this;},blur(){doc.activeElement=doc.body;},remove(){this.isConnected=false;},
  });
  const root=element(), loader=element(), skip=element(), language=element(), count=element(), bar=element(), track=element();
  const words=['ENGLISH','HINDI','FRENCH','JAPANESE','ARABIC','SPANISH','ITALIAN','WELCOME'].map(name=>{const word=element();word.dataset.language=name;return word;});
  const regions=[element(),element(),element(),element()];
  const body=element();
  const ids={loader,loaderLanguage:language,loaderCount:count,loaderBar:bar};
  loader.querySelectorAll=()=>words;
  loader.querySelector=selector=>selector==='[data-loader-skip]'?skip:track;
  loader.contains=el=>el===skip;
  root.classList.add('is-loading');
  doc=Object.assign(events(),{documentElement:root,body,activeElement:body,readyState:loaded?'complete':'interactive',getElementById:id=>ids[id],querySelectorAll:selector=>selector==='[data-loader-inert]'?regions.filter(el=>el.attributes.has('data-loader-inert')):regions});
  const motion=Object.assign(events(),{matches:reduced});
  const values=new Map(repeat?[['zykken_greeting_boot_v3','1']]:[]);
  const schedule=(fn,delay,interval=0)=>{const id=++nextId;timers.set(id,{fn,at:now+delay,interval});return id;};
  const win=Object.assign(events(),{
    performance:{now:()=>now},matchMedia:()=>motion,
    sessionStorage:{getItem(key){if(storageBlocked)throw Error('Blocked storage');return values.get(key);},setItem(key,value){if(storageBlocked)throw Error('Blocked storage');values.set(key,value);}},
    setTimeout:(fn,delay)=>schedule(fn,delay),setInterval:(fn,delay)=>schedule(fn,delay,delay),clearTimeout:id=>timers.delete(id),clearInterval:id=>timers.delete(id),
  });
  function advance(ms){const end=now+ms;while(true){let next;for(const [id,timer]of timers)if(timer.at<=end&&(!next||timer.at<next[1].at))next=[id,timer];if(!next)break;const [id,timer]=next;now=timer.at;if(timer.interval)timer.at+=timer.interval;else timers.delete(id);timer.fn();}now=end;}
  return {doc,win,root,body,loader,skip,words,language,count,bar,regions,motion,timers,advance};
}

test('the greeting sequence completes and releases the page even without a load event',async()=>{
  const {setupGreetingLoader}=await import('../app.mjs');
  const b=browser({storageBlocked:true});
  setupGreetingLoader(b.doc,b.win);
  assert.equal(b.language.textContent,'ENGLISH');
  assert.ok(b.regions.every(el=>el.inert));
  b.advance(520);
  assert.equal(b.language.textContent,'HINDI');
  b.advance(3120);
  assert.equal(b.language.textContent,'WELCOME');
  assert.equal(b.count.textContent,'08 / 08');
  assert.equal(b.bar.style.transform,'scaleX(1)');
  b.advance(2360);
  assert.ok(b.root.classList.contains('is-loading'));
  b.advance(420);
  assert.ok(!b.root.classList.contains('is-loading'));
  assert.ok(b.regions.every(el=>!el.inert));
  b.advance(1320);
  assert.equal(b.loader.isConnected,false);
  assert.equal(b.timers.size,0);
});

test('repeat visits show Welcome and release the page sooner',async()=>{
  const {setupGreetingLoader}=await import('../app.mjs');
  const b=browser({repeat:true,loaded:true});
  setupGreetingLoader(b.doc,b.win);
  assert.equal(b.language.textContent,'WELCOME');
  b.advance(1600);
  assert.ok(!b.root.classList.contains('is-loading'));
  assert.ok(b.regions.every(el=>!el.inert));
  b.advance(1400);
  assert.equal(b.loader.isConnected,false);
  assert.equal(b.timers.size,0);
});

test('Skip, Escape and reduced motion leave navigation accessible',async()=>{
  const {setupGreetingLoader}=await import('../app.mjs');
  for(const action of ['skip','escape','reduced','motion-change']){
    const b=browser({reduced:action==='reduced'});
    b.regions[0].inert=true;
    setupGreetingLoader(b.doc,b.win);
    if(action==='skip')b.skip.dispatchEvent({type:'click'});
    if(action==='escape')b.doc.dispatchEvent({type:'keydown',key:'Escape'});
    if(action==='motion-change')b.motion.dispatchEvent({type:'change',matches:true});
    assert.equal(b.loader.isConnected,false,action);
    assert.ok(!b.root.classList.contains('is-loading'),action);
    assert.ok(b.regions.slice(1).every(el=>!el.inert),action);
    assert.equal(b.regions[0].inert,true,action);
    assert.equal(b.timers.size,0,action);
    if(action!=='reduced')assert.equal(b.win.sessionStorage.getItem('zykken_greeting_boot_v3'),'1',action);
  }
});

test('the independent bootstrap watchdog unlocks a page when the module fails',async()=>{
  const {greetingBootstrap}=await import('../layout.mjs');
  const b=browser();
  b.root.classList.remove('is-loading');
  b.body.classList.add('js-enhanced');
  b.regions[0].inert=true;
  b.regions[0].setAttribute('data-loader-inert','');
  vm.runInNewContext(greetingBootstrap.replace(/^<script>|<\/script>$/g,''),{window:b.win,document:b.doc,setTimeout:b.win.setTimeout,Event:class{constructor(type){this.type=type;}}});
  assert.ok(b.root.classList.contains('is-loading'));
  b.advance(8500);
  assert.ok(!b.root.classList.contains('is-loading'));
  assert.equal(b.loader.isConnected,false);
  assert.equal(b.regions[0].inert,false);
  assert.ok(!b.body.classList.contains('js-enhanced'));
});
