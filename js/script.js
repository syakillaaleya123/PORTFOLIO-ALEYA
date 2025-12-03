/* script.js
   Responsible for:
   - Live digital clock
   - Welcome popup (one-time per load)
   - Cute falling petals effect
   - Gallery lightbox
   - Contact form validation
*/

// ---------- Digital clock ----------
function updateClock(){
  const el = document.getElementById('digital-clock');
  if(!el) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  el.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// ---------- Welcome popup ----------
window.addEventListener('load', () => {
  // gentle custom popup (use alert if you prefer)
  if(!sessionStorage.getItem('welcomeShown')){
    // use built-in alert for simplicity / assignment safety
    alert("Welcome to Nur Syakilla Aleya's personal website!");
    sessionStorage.setItem('welcomeShown','1');
  }
});

// ---------- Falling petals ----------
(function createPetals(){
  const count = 22; // number of petals
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'petal';
    // random horizontal start
    p.style.left = Math.random() * window.innerWidth + 'px';
    // random size
    const size = 8 + Math.random()*12;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    // random animation duration and delay
    const dur = 6 + Math.random()*6; // seconds
    p.style.animationDuration = dur + 's';
    p.style.animationDelay = (Math.random()*-dur) + 's';
    // slight horizontal drift using transform on CSS variable via keyframes not set here
    document.body.appendChild(p);
    // remove after long time for performance (optional)
    setTimeout(()=>{ if(p.parentNode) p.parentNode.removeChild(p); }, 1000 * (dur + 6));
  }
})();

// ---------- Gallery lightbox ----------
(function(){
  const gallery = document.getElementById('gallery');
  if(!gallery) return;
  const images = gallery.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');

  function openLB(src, alt){
    if(!lightbox || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function closeLB(){
    if(!lightbox) return;
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  images.forEach(img => {
    img.addEventListener('click', ()=> openLB(img.src, img.alt));
    img.addEventListener('keypress', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') openLB(img.src, img.alt);
    });
  });

  if(lbClose) lbClose.addEventListener('click', closeLB);
  if(lightbox) lightbox.addEventListener('click', (e)=>{
    if(e.target === lightbox) closeLB();
  });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLB(); });
})();

// ---------- Contact form validation (front-end only) ----------
(function(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  const resp = document.getElementById('form-response');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    // simple validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if(!name || !email || !message){
      resp.textContent = 'Please fill in all required fields.';
      resp.style.color = 'crimson';
      return;
    }
    // basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      resp.textContent = 'Please enter a valid email address.';
      resp.style.color = 'crimson';
      return;
    }
    // success (no server) — show friendly message and reset form
    resp.textContent = 'Thank you — your message has been recorded locally. (No backend in this assignment)';
    resp.style.color = 'green';
    form.reset();
  });
})();
