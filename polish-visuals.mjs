import {icon} from './layout.mjs';

// Orthographic dot map: pre-rendered SVG stays visible without JavaScript.
const continents = [
  [[-17,36],[6,37],[34,30],[50,12],[40,-13],[31,-34],[18,-35],[9,-5],[-15,12]],
  [[-10,36],[-10,55],[12,71],[48,69],[72,76],[150,62],[178,51],[146,32],[124,20],[106,1],[80,8],[69,25],[44,11],[36,31]],
  [[-168,69],[-130,72],[-105,80],[-58,52],[-79,26],[-97,15],[-116,30],[-150,58]],
  [[-81,12],[-62,10],[-35,-8],[-49,-28],[-68,-55],[-77,-25]],
  [[113,-12],[137,-10],[153,-25],[146,-39],[115,-34]],
  [[-54,60],[-20,67],[-28,83],[-50,83]], [[43,-12],[51,-16],[49,-26],[44,-25]]
];
function within(x,y,polygon){
  let inside=false;
  for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
    const [xi,yi]=polygon[i], [xj,yj]=polygon[j];
    if(((yi>y)!==(yj>y)) && x<(xj-xi)*(y-yi)/(yj-yi)+xi) inside=!inside;
  }
  return inside;
}
export function dottedGlobe(){
  const dots=[];
  for(let lat=-84;lat<=84;lat+=5){
    const phi=lat*Math.PI/180;
    const step=5/Math.max(.25,Math.cos(phi));
    for(let lon=-180;lon<180;lon+=step){
      const theta=(lon-12)*Math.PI/180, depth=Math.cos(phi)*Math.cos(theta);
      if(depth<0) continue;
      const land=continents.some(p=>within(lon,lat,p));
      const x=300+162*Math.cos(phi)*Math.sin(theta), y=218-162*Math.sin(phi);
      dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${land?'1.8':'1.05'}" fill="${land?'#eceeee':'#646a70'}" opacity="${((land?.45:.14)+depth*(land?.55:.26)).toFixed(2)}"/>`);
    }
  }
  return `<div class="globe-visual" aria-hidden="true"><svg viewBox="0 0 600 430" fill="none"><defs><radialGradient id="world-glow"><stop stop-color="#fd3a25" stop-opacity=".32"/><stop offset="1" stop-color="#fd3a25" stop-opacity="0"/></radialGradient><radialGradient id="world-surface" cx=".35" cy=".25"><stop stop-color="#252a2f"/><stop offset="1" stop-color="#090c10"/></radialGradient><linearGradient id="world-orbit"><stop stop-color="#fd3a25" stop-opacity="0"/><stop offset=".45" stop-color="#ff7356"/><stop offset="1" stop-color="#fd3a25" stop-opacity=".15"/></linearGradient></defs><ellipse cx="300" cy="344" rx="220" ry="72" fill="url(#world-glow)"/><ellipse cx="300" cy="218" rx="258" ry="72" transform="rotate(-22 300 218)" stroke="#ffffff16"/><circle cx="300" cy="218" r="164" fill="url(#world-surface)" stroke="#ffffff20"/><g class="world-dots">${dots.join('')}</g><ellipse cx="300" cy="218" rx="258" ry="72" transform="rotate(-22 300 218)" stroke="url(#world-orbit)" stroke-width="1.4" stroke-dasharray="520 650"/><g class="world-signals"><circle cx="426" cy="118" r="5" fill="#fd3a25"/><circle cx="426" cy="118" r="12" stroke="#fd3a2580"/><circle cx="155" cy="311" r="4" fill="#ff745b"/><circle cx="155" cy="311" r="10" stroke="#fd3a2560"/></g><path d="M433 115h35l15-15h57M155 312h-31l-12 13H55" stroke="#ffffff30"/></svg><span class="globe-caption"><i></i>Human thinking. Connected systems.</span></div>`;
}

export function processVisual(index){
  const stages=[
    {label:'A clear starting point',first:'Your workflow',middle:'Find the friction',last:'Agree the scope',icon:'workflow',chips:['Workflow map','Success criteria']},
    {label:'Prove it before scaling it',first:'Real scenarios',middle:'Build the pilot',last:'Review together',icon:'code',chips:['Working prototype','Connected tools']},
    {label:'Ready for the real world',first:'Acceptance checks',middle:'Launch with care',last:'Your team, ready',icon:'shield',chips:['Team training','Your code & docs']}
  ];
  const s=stages[index];
  return `<div class="process-workbench" aria-hidden="true"><div class="process-art-top"><span>DELIVERY / 0${index+1}</span><span class="status-light">${s.label}</span></div><div class="process-map"><div class="process-node node-input"><span>${icon('spark')}</span>${s.first}</div><div class="process-path"><i></i><i></i><i></i></div><div class="process-node node-core"><span>${icon(s.icon)}</span><strong>${s.middle}</strong></div><div class="process-path"><i></i><i></i><i></i></div><div class="process-node node-output"><span>${icon('check')}</span>${s.last}</div></div><div class="process-art-bottom">${s.chips.map(c=>`<span>${icon('check')}${c}</span>`).join('')}</div></div>`;
}

export function benefitVisual(index){
  if(index===0) return `<div class="benefit-art benefit-outcomes" aria-hidden="true"><span class="art-eyebrow">01 / BUILT AROUND YOUR OUTCOME</span><div class="outcome-console"><div class="console-title">More room for real work ${icon('chart')}</div>${[['Time recovered','78%'],['Faster follow-through','92%'],['Less manual effort','64%']].map(([label,width],i)=>`<div class="outcome-line"><span>${label}</span><div><i style="--fill:${width};--delay:${i*.2}s"></i></div>${icon('check')}</div>`).join('')}<span class="console-foot">A clear goal. A useful system.</span></div></div>`;
  if(index===1) return `<div class="benefit-art benefit-checks" aria-hidden="true"><span class="art-eyebrow">02 / TESTED ON REAL SCENARIOS</span><div class="scenario-stack">${['Happy path','Edge cases','Human handoff'].map((s,i)=>`<div style="--i:${i}"><span>${icon(i===2?'voice':'check')}</span><strong>${s}</strong><i></i></div>`).join('')}</div></div>`;
  return `<div class="benefit-art ${index===2?'security-art':'design-art'}"><span class="art-eyebrow">0${index+1} / ${index===2?'YOUR RULES, YOUR OWNERSHIP':'THOUGHTFUL AT EVERY TOUCHPOINT'}</span><img src="/assets/agen/benefit-${index===2?'security':'design'}.svg" width="${index===2?'230':'380'}" height="260" alt="${index===2?'Sculptural security shield':'Layered interface design illustration'}" loading="lazy"><span class="art-caption">${index===2?'Scoped access · Clear handoffs':'Clarity · Context · Care'}</span></div>`;
}

export function testimonialEmblem(index){
  const labels=[['Enquiry','Conversation','Viewing'],['Discover','Concierge','Checkout'],['Members','Coaches','Plans']][index];
  return `<div class="testimonial-emblem" aria-hidden="true"><div class="voice-orbit"><i></i><i></i></div><span class="voice-node voice-node-one">${icon('spark')}<small>${labels[0]}</small></span><span class="voice-core">${icon(index===2?'workflow':'voice')}</span><span class="voice-node voice-node-two">${icon('check')}<small>${labels[2]}</small></span><span class="voice-context">${labels[1]}</span><svg viewBox="0 0 300 180" preserveAspectRatio="none"><path d="M56 52H150V130H244M150 52V93"/></svg></div>`;
}
