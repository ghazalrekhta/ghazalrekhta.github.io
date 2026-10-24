(()=>{const c=document.getElementById('embers');if(!c)return;const x=c.getContext('2d',{alpha:true});if(!x)return;
const N=navigator,cores=N.hardwareConcurrency||8,mem=N.deviceMemory||8,low=cores<=4||mem<=4,
mob=matchMedia('(pointer:coarse)').matches||innerWidth<760,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const DPR_CAP=low?1:(mob?1.5:2),DENS=low?.5:(mob?.6:1),STEP=(low||mob)?1000/30:0;
let EH,EHR,ES,EL,EA,EB,SPR=[];const NB=8,SS=64;
function rd(){const cs=getComputedStyle(document.documentElement),V=(k,f)=>(cs.getPropertyValue(k).trim()||f);EH=+V('--ember-h',30);EHR=+V('--ember-hr',15);ES=V('--ember-s','90%');EL=V('--ember-l','70%');EA=+V('--ember-a',1);EB=V('--ember-blend','lighter');sprites()}
function sprites(){SPR=[];for(let i=0;i<NB;i++){const s=document.createElement('canvas');s.width=s.height=SS;const g=s.getContext('2d'),h=EH+EHR*(i+.5)/NB,
 r=g.createRadialGradient(SS/2,SS/2,0,SS/2,SS/2,SS/2);r.addColorStop(0,`hsla(${h},${ES},${EL},1)`);r.addColorStop(1,`hsla(${h},${ES},${EL},0)`);g.fillStyle=r;g.fillRect(0,0,SS,SS);SPR.push(s)}}
let w,h,d,P=[],run=!reduce,last=0,acc=0;
function size(){d=Math.min(devicePixelRatio||1,DPR_CAP);w=innerWidth;h=innerHeight;c.width=Math.round(w*d);c.height=Math.round(h*d);x.setTransform(d,0,0,d,0,0);
 const n=Math.round(Math.min(70,Math.max(26,w*h/16000))*DENS);while(P.length<n)P.push(mk({},true));P.length=n;if(!run)draw()}
function mk(p,init){p.x=Math.random()*w;p.y=init?Math.random()*h:h+10;p.r=Math.random()*1.8+.5;p.vy=-(Math.random()*.25+.08);p.vx=(Math.random()-.5)*.12;
 p.a=Math.random()*.5+.2;p.ph=Math.random()*6.28;p.sw=Math.random()*.6+.2;p.b=(Math.random()*NB)|0;return p}
function draw(){x.globalCompositeOperation='source-over';x.globalAlpha=1;x.clearRect(0,0,w,h);x.globalCompositeOperation=EB;
 for(let i=0;i<P.length;i++){const p=P[i],R=p.r*5;x.globalAlpha=Math.max(0,Math.min(1,EA*p.a*(.65+.35*Math.sin(p.ph*3))));x.drawImage(SPR[p.b],p.x-R,p.y-R,R*2,R*2)}
 x.globalAlpha=1}
function step(dt){for(let i=0;i<P.length;i++){const p=P[i];p.ph+=.01*dt;p.y+=p.vy*dt;p.x+=(p.vx+Math.sin(p.ph)*p.sw*.3)*dt;if(p.y<-12)mk(p,false)}}
function frame(t){if(!run)return;requestAnimationFrame(frame);if(!last){last=t;return}const el=t-last;
 if(STEP){acc+=el;last=t;if(acc<STEP-2)return;const e=Math.min(100,acc);acc=0;step(e/16.7)}else{last=t;step(Math.min(50,el)/16.7)}draw()}
rd();size();let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(size,150)},{passive:true});
document.addEventListener('themechange',()=>{rd();if(!run)draw()});
if(reduce){draw();return}
document.addEventListener('visibilitychange',()=>{const v=!document.hidden;if(v&&!run){run=true;last=0;acc=0;requestAnimationFrame(frame)}else if(!v)run=false});
requestAnimationFrame(frame)})();
