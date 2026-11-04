// Navigation, persistent theme, quote form feedback and page utilities
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'✕':'☰'});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');if(menuButton)menuButton.textContent='☰'}));

const root=document.documentElement;
const themeToggle=document.getElementById('themeToggle');
const savedTheme=localStorage.getItem('almubadala-theme');
const preferredDark=window.matchMedia?.('(prefers-color-scheme: dark)').matches;
function applyTheme(theme){
  root.dataset.theme=theme;
  const dark=theme==='dark';
  if(themeToggle){
    themeToggle.setAttribute('aria-label',dark?'تفعيل الوضع الفاتح':'تفعيل الوضع الداكن');
    themeToggle.setAttribute('title',dark?'تفعيل الوضع الفاتح':'تفعيل الوضع الداكن');
    themeToggle.innerHTML=dark?'<span class="theme-icon" aria-hidden="true">☀</span><span class="theme-label">الوضع الفاتح</span>':'<span class="theme-icon" aria-hidden="true">☾</span><span class="theme-label">الوضع الداكن</span>';
  }
}
applyTheme(savedTheme||'dark');
themeToggle?.addEventListener('click',()=>{const next=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('almubadala-theme',next);applyTheme(next)});

document.getElementById('year').textContent=new Date().getFullYear();
const form=document.getElementById('quoteForm');
form?.addEventListener('submit',event=>{event.preventDefault();const data=Object.fromEntries(new FormData(form).entries());const message=`طلب عرض سعر جديد\nالاسم: ${data.name}\nالهاتف: ${data.phone}\nالخدمة: ${data.service}\nالتفاصيل: ${data.details||'لم يذكر'}`;const status=document.getElementById('formStatus');try{const requests=JSON.parse(localStorage.getItem('almubadala-quote-requests')||'[]');requests.push({...data,createdAt:new Date().toISOString()});localStorage.setItem('almubadala-quote-requests',JSON.stringify(requests));status.textContent='تم حفظ طلبك على هذا الجهاز بنجاح. لإرساله للشركة واستلامه من الإدارة، يلزم ربط رقم واتساب أو بريد الشركة الرسمي.';}catch(error){status.textContent='تعذر حفظ الطلب على هذا الجهاز. حاول مرة أخرى.';}console.info(message)});

const backToTop=document.getElementById('backToTop');
window.addEventListener('scroll',()=>backToTop?.classList.toggle('visible',window.scrollY>450),{passive:true});
backToTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('.nav a')];
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id))}}),{rootMargin:'-35% 0px -55% 0px'});sections.forEach(section=>observer.observe(section))}


// Machine-photo carousel: arrows, dots, keyboard-friendly controls.
const machineSlides=[...document.querySelectorAll('.machine-slide')];
const machineDots=[...document.querySelectorAll('.machine-dots button')];
let machineIndex=0;
function showMachineSlide(index){if(!machineSlides.length)return;machineIndex=(index+machineSlides.length)%machineSlides.length;machineSlides.forEach((slide,i)=>slide.classList.toggle('active',i===machineIndex));machineDots.forEach((dot,i)=>{dot.classList.toggle('active',i===machineIndex);dot.setAttribute('aria-pressed',String(i===machineIndex))});}
document.querySelector('.machine-arrow.prev')?.addEventListener('click',()=>showMachineSlide(machineIndex-1));
document.querySelector('.machine-arrow.next')?.addEventListener('click',()=>showMachineSlide(machineIndex+1));
machineDots.forEach(dot=>dot.addEventListener('click',()=>showMachineSlide(Number(dot.dataset.go))));

// Technical-support panel opens reliably and takes the visitor to the request form.
const supportToggle=document.getElementById('supportToggle');
const supportPanel=document.getElementById('supportPanel');
supportToggle?.addEventListener('click',()=>{const open=supportPanel.hidden;supportPanel.hidden=!open;supportToggle.setAttribute('aria-expanded',String(open));});
document.getElementById('supportRequest')?.addEventListener('click',()=>{const serviceSelect=document.querySelector('#quoteForm select[name="service"]');if(serviceSelect){const supportOption=[...serviceSelect.options].find(o=>o.textContent.includes('دعم فني'));if(!supportOption){const option=document.createElement('option');option.textContent='دعم فني / استفسار';serviceSelect.add(option);option.selected=true;}else serviceSelect.value=supportOption.value;}supportPanel.hidden=true;supportToggle?.setAttribute('aria-expanded','false');});
