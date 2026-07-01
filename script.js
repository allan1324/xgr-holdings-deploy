const root = document.documentElement;
const progress = document.querySelector('#progress');
const nav = document.querySelector('#nav');
const parallaxNodes = [...document.querySelectorAll('.parallax')];
function onScroll(){const height=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${height>0?scrollY/height:0})`;nav.classList.toggle('on',scrollY>38)}addEventListener('scroll',onScroll,{passive:true});onScroll();
const sparkField=document.querySelector('#sparkField');for(let i=0;i<42;i++){const spark=document.createElement('i');spark.className='spark';spark.style.setProperty('--x',`${(i*37)%100}%`);spark.style.setProperty('--y',`${(i*61)%100}%`);spark.style.setProperty('--s',`${2+(i%4)}px`);spark.style.setProperty('--d',`${7+(i%8)}s`);spark.style.setProperty('--delay',`${(i%10)*-.65}s`);sparkField.appendChild(spark)}
let pointerX=innerWidth/2,pointerY=innerHeight/2,targetX=pointerX,targetY=pointerY;addEventListener('pointermove',e=>{targetX=e.clientX;targetY=e.clientY;root.style.setProperty('--mx',`${e.clientX}px`);root.style.setProperty('--my',`${e.clientY}px`)});function animateParallax(){pointerX+=(targetX-pointerX)*.06;pointerY+=(targetY-pointerY)*.06;const nx=pointerX/innerWidth-.5,ny=pointerY/innerHeight-.5;parallaxNodes.forEach(node=>{const depth=Number(node.dataset.depth||0);node.style.transform=`translate3d(${nx*innerWidth*depth}px,${ny*innerHeight*depth}px,0)`});requestAnimationFrame(animateParallax)}animateParallax();
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.14,rootMargin:'0px 0px -7%'});document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min((i%5)*60,240)}ms`;observer.observe(el)});
document.querySelectorAll('[data-tilt]').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;card.style.setProperty('--px',`${x}px`);card.style.setProperty('--py',`${y}px`);const rx=(y/r.height-.5)*-2.2,ry=(x/r.width-.5)*2.2;card.style.transform=`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});

const body=document.body;
const menuButton=document.querySelector('#menuButton');
const menuPanel=document.querySelector('#menuPanel');
function setMenu(open){menuButton.setAttribute('aria-expanded',String(open));menuPanel.setAttribute('aria-hidden',String(!open));menuPanel.classList.toggle('is-open',open);body.classList.toggle('menu-open',open);if(open)setTimeout(()=>menuPanel.querySelector('a')?.focus(),160)}
menuButton.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
menuPanel.addEventListener('click',event=>{if(event.target.closest('a'))setMenu(false)});
addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});

const navSectionLinks=[...document.querySelectorAll('[data-nav]')];
const activeSectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navSectionLinks.forEach(link=>link.classList.toggle('is-active',link.dataset.nav===entry.target.dataset.section))}})},{rootMargin:'-42% 0px -50%',threshold:0});
document.querySelectorAll('[data-section]').forEach(section=>activeSectionObserver.observe(section));

const companyData=[
{monogram:'CW',industry:'BEVERAGES & DISTRIBUTION',title:'Charlie’s Winery',description:'Developing, marketing and distributing distinctive beverage brands for modern consumers and commercial partners.',href:'companies/charlies-winery/'},
{monogram:'XR',industry:'RESOURCES & ENTERPRISE',title:'Xanadu Global Resources',description:'Identifying and developing opportunities across resource-driven sectors through reliable systems and disciplined execution.',href:'#contact'},
{monogram:'DC',industry:'CONSTRUCTION & ENGINEERING',title:'Designated Contractors Limited',description:'Delivering structured construction, engineering and project-management services with accountability at every stage.',href:'#contact'},
{monogram:'XH',industry:'HOSPITALITY & PROPERTY',title:'XGR Hospitality',description:'Creating thoughtful accommodation and property experiences designed around comfort, reliability and modern living.',href:'#contact'},
{monogram:'XC',industry:'INVESTMENT & FINANCIAL STRATEGY',title:'XGR Capital',description:'Supporting long-term value creation through strategic investment management, disciplined research and considered risk.',href:'#contact'},
{monogram:'XF',industry:'SOCIAL & COMMUNITY DEVELOPMENT',title:'XGRD Foundation',description:'Advancing practical initiatives that strengthen communities, expand opportunity and support sustainable human development.',href:'#contact'}
];
const companyTabs=[...document.querySelectorAll('.company-tab')];
const companyStage=document.querySelector('.company-stage');
let selectedCompany=0;
function selectCompany(index,focus=false){if(index===selectedCompany&&companyTabs[index].classList.contains('is-active'))return;selectedCompany=index;companyStage.classList.add('is-switching');companyTabs.forEach((tab,i)=>{const active=i===index;tab.classList.toggle('is-active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});setTimeout(()=>{const item=companyData[index];document.querySelector('#stageMonogram').textContent=item.monogram;document.querySelector('#stageIndustry').textContent=item.industry;document.querySelector('#stageTitle').textContent=item.title;document.querySelector('#stageDescription').textContent=item.description;document.querySelector('#stageLink').setAttribute('href',item.href);document.querySelector('#stageCounter').textContent=`${String(index+1).padStart(2,'0')} / 06`;document.querySelector('#stageProgress').style.width=`${((index+1)/6)*100}%`;companyStage.classList.remove('is-switching');if(focus)companyTabs[index].focus()},210)}
companyTabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectCompany(index));tab.addEventListener('mouseenter',()=>{if(matchMedia('(hover:hover)').matches)selectCompany(index)});tab.addEventListener('keydown',event=>{if(event.key==='ArrowDown'||event.key==='ArrowRight'){event.preventDefault();selectCompany((index+1)%companyTabs.length,true)}if(event.key==='ArrowUp'||event.key==='ArrowLeft'){event.preventDefault();selectCompany((index-1+companyTabs.length)%companyTabs.length,true)}})});
document.querySelectorAll('[data-company-jump]').forEach(link=>link.addEventListener('click',()=>setTimeout(()=>selectCompany(Number(link.dataset.companyJump)),450)));

const numberObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){const el=entry.target;const target=Number(el.dataset.count||0);const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce){el.textContent=String(target).padStart(2,'0')}else{const begin=performance.now();function tick(now){const p=Math.min((now-begin)/900,1);const eased=1-Math.pow(1-p,3);el.textContent=String(Math.round(target*eased)).padStart(2,'0');if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)}numberObserver.unobserve(el)}})},{threshold:.7});document.querySelectorAll('[data-count]').forEach(el=>numberObserver.observe(el));

document.querySelectorAll('[data-href]').forEach(el=>{el.addEventListener('click',e=>{if(e.target.closest('a'))return;location.href=el.dataset.href});el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();location.href=el.dataset.href}})});
