const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
test('slides wrap correctly in either direction, including one or zero slides', async()=>{
 const {nextSlideIndex}=await import('../app.mjs');
 assert.equal(nextSlideIndex(0,-1,3),2);
 assert.equal(nextSlideIndex(2,1,3),0);
 assert.equal(nextSlideIndex(1,1,3),2);
 assert.equal(nextSlideIndex(0,1,1),0);
 assert.equal(nextSlideIndex(0,1,0),0);
});
test('Agen adaptation retains semantic pages, contact contracts and valid local artwork',async()=>{
 const {loadSite,renderRoute}=require('../scripts/build.cjs');
 const site=await loadSite();
 const routes=['/','/about','/services','/work','/custom-quote','/contact','/insights','/privacy','/terms','/404',...site.content.caseStudies.map(c=>`/case-study/${c.slug}`),...site.content.insights.map(c=>`/blog/${c.slug}`)];
 for(const route of routes){
  const {html}=await renderRoute(route,site);
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,route);
  assert.doesNotMatch(html,/Crix|AgenAI|youraiagency|Trustpilot/,route);
  for(const [,src] of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)) assert.ok(fs.existsSync(path.join(__dirname,'..',src)),`${route}: ${src}`);
  if(html.includes('data-contact-form')) for(const field of ['name','email','phone','need','message','company_site']) assert.match(html,new RegExp(`name="${field}"`),route);
 }
 const {html}=await renderRoute('/',site);
 for(const anchor of ['home','about','services','works','quote','contact'])assert.match(html,new RegExp(`id="${anchor}"`));
 assert.equal((html.match(/data-service-index=/g)||[]).length,5);
});

test('slider controls wrap, update counts, and pause for hover, focus, visibility and reduced motion',async()=>{
 const {setupSliders}=await import('../app.mjs');
 const make=()=>({listeners:{},dataset:{},attrs:{},addEventListener(type,fn){(this.listeners[type]||=[]).push(fn);},emit(type,event={}){for(const fn of this.listeners[type]||[])fn(event);},getAttribute(name){return this.attrs[name]||null;},setAttribute(name,value){this.attrs[name]=value;}});
 const track=Object.assign(make(),{children:[{},{},{}],scrollLeft:0,clientWidth:400,scrollTo({left}){this.scrollLeft=left;this.emit('scroll');}});
 const prev=make(),next=make(),count=make(),total=make();
 const dots=[0,1,2].map(()=>({classList:{toggle(){}}}));
 const shell=Object.assign(make(),{dataset:{autoplay:'3000'},querySelector(sel){return {'.slide-track':track,'[data-slide-prev]':prev,'[data-slide-next]':next,'[data-slide-count]':count,'[data-slide-total]':total}[sel]||null;},querySelectorAll(sel){return sel==='.process-progress i'?dots:[];},contains(el){return [track,prev,next].includes(el);}});
 shell.attrs['aria-label']='Delivery steps';
 const doc=Object.assign(make(),{hidden:false,querySelectorAll(sel){return sel==='[data-slider]'?[shell]:[];}});
 const motion=Object.assign(make(),{matches:false});
 const win=Object.assign(make(),{matchMedia(){return motion;}});
 let observer;
 const timers=new Map();let serial=0;
 const saved={document:global.document,window:global.window,IntersectionObserver:global.IntersectionObserver,setInterval:global.setInterval,clearInterval:global.clearInterval};
 Object.assign(global,{document:doc,window:win,IntersectionObserver:class{constructor(fn){observer=fn;}observe(){}},setInterval(fn){timers.set(++serial,fn);return serial;},clearInterval(id){timers.delete(id);}});
 win.IntersectionObserver=global.IntersectionObserver;
 try{
  setupSliders();assert.equal(total.textContent,'03');assert.equal(count.textContent,'01');assert.equal(timers.size,0);
  observer([{isIntersecting:true}]);assert.equal(timers.size,1);
  next.emit('click');assert.equal(track.scrollLeft,400);assert.equal(count.textContent,'02');
  next.emit('click');next.emit('click');assert.equal(track.scrollLeft,0);assert.equal(count.textContent,'01');
  prev.emit('click');assert.equal(track.scrollLeft,800);assert.equal(count.textContent,'03');
  let prevented=false;track.emit('keydown',{key:'ArrowLeft',preventDefault(){prevented=true;}});assert.ok(prevented);assert.equal(track.scrollLeft,400);
  shell.emit('mouseenter');assert.equal(timers.size,0);shell.emit('mouseleave');assert.equal(timers.size,1);
  shell.emit('focusin');assert.equal(timers.size,0);shell.emit('focusout',{relatedTarget:null});assert.equal(timers.size,1);
  motion.matches=true;motion.emit('change');assert.equal(timers.size,0);motion.matches=false;motion.emit('change');assert.equal(timers.size,1);
  doc.hidden=true;doc.emit('visibilitychange');assert.equal(timers.size,0);doc.hidden=false;doc.emit('visibilitychange');assert.equal(timers.size,1);
  observer([{isIntersecting:false}]);assert.equal(timers.size,0);observer([{isIntersecting:true}]);[...timers.values()][0]();assert.equal(track.scrollLeft,800);
  assert.equal(track.attrs['aria-label'],'Delivery steps: 3 of 3');
 }finally{for(const [key,value]of Object.entries(saved)){if(value===undefined)delete global[key];else global[key]=value;}}
});
