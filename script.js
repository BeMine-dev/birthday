/* ============ PAGE NAVIGATION ============ */
const pages = document.querySelectorAll('.page');
const dots  = document.querySelectorAll('.dot');
const navDots = document.getElementById('navDots');

function goTo(index){
  pages.forEach((p,i)=> p.classList.toggle('active', i===index));
  dots.forEach((d,i)=> d.classList.toggle('active', i===index));
  if(index > 0) navDots.classList.add('show');
  pages.forEach(p => p.scrollTop = 0);
  if(index === 1) startBirthdayPage();
  if(index === 4) resetSurprise();
}

/* ============ FLOATING BACKGROUND PARTICLES ============ */
(function spawnParticles(){
  const emojis = ['💖','✨','🌸','💫','🎈','⭐','🩷','💕'];
  const container = document.getElementById('particles');
  const count = window.innerWidth < 500 ? 14 : 22;
  for(let i=0;i<count;i++){
    const s = document.createElement('span');
    s.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    s.style.left = Math.random()*100 + 'vw';
    s.style.fontSize = (Math.random()*16 + 14) + 'px';
    s.style.animationDuration = (Math.random()*14 + 12) + 's';
    s.style.animationDelay = (Math.random()*10) + 's';
    container.appendChild(s);
  }
})();

/* ============ CONFETTI ============ */
function burstConfetti(count = 130){
  const isMobile = window.innerWidth < 600;
  const total = isMobile ? Math.round(count * 0.6) : count;
  const colors = ['#ff9eb5','#ffd6e0','#c9a7ff','#ffcc4d','#ffd9b3','#b8e0ff','#ff7aa2'];
  for(let i=0; i<total; i++){
    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.style.left = Math.random()*100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random()*colors.length)];
    piece.style.width  = (Math.random()*8 + 6) + 'px';
    piece.style.height = (Math.random()*8 + 6) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDuration = (Math.random()*2 + 2.5) + 's';
    piece.style.animationDelay = (Math.random()*0.6) + 's';
    document.body.appendChild(piece);
    setTimeout(()=> piece.remove(), 5000);
  }
}

/* ============ BIRTHDAY PAGE ============ */
let birthdayStarted = false;
function startBirthdayPage(){
  if(birthdayStarted) return;
  birthdayStarted = true;

  const title = document.getElementById('hbTitle');
  const fullText = "Happy Birthday, Payal!";
  title.textContent = "";
  let i = 0;
  const typer = setInterval(()=>{
    title.textContent += fullText[i];
    i++;
    if(i >= fullText.length) clearInterval(typer);
  }, 70);

  setTimeout(()=> burstConfetti(120), 400);
  startTypewriter();
}

/* ============ TYPEWRITER MESSAGE ============ */
function startTypewriter(){
  const el = document.getElementById('typeLine');
  const message = "You are the best thing that ever happened to me, MaM 💖";
  el.innerHTML = "";
  let idx = 0;
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.textContent = '|';
  el.appendChild(cursor);

  const timer = setInterval(()=>{
    if(idx >= message.length){ clearInterval(timer); return; }
    cursor.insertAdjacentText('beforebegin', message[idx]);
    idx++;
  }, 55);
}

/* ============ CAKE: BLOW CANDLES ============ */
const cake = document.getElementById('cake');
let blown = false;
cake.addEventListener('click', ()=>{
  if(blown) return;
  blown = true;
  document.querySelectorAll('.flame').forEach(f => f.classList.add('out'));
  burstConfetti(180);
});

/* ============ GIFT SURPRISE ============ */
const gift = document.getElementById('gift');
const giftLid = document.getElementById('giftLid');
const surpriseContent = document.getElementById('surpriseContent');
const reasonsList = document.getElementById('reasonsList');
let giftOpened = false;

gift.addEventListener('click', ()=>{
  if(giftOpened) return;
  giftOpened = true;
  giftLid.classList.add('open');
  burstConfetti(100);
  setTimeout(()=>{
    surpriseContent.style.display = 'block';

    const items = reasonsList.querySelectorAll('li:not(.msg-sign)');
    items.forEach((li, i)=>{
      setTimeout(()=> li.classList.add('show'), i*700);
    });

    const sign = document.getElementById('msgSign');
    setTimeout(()=>{
      sign.classList.add('show');
    }, items.length * 700 + 400);
  }, 500);
});

function resetSurprise(){
  giftOpened = false;
  giftLid.classList.remove('open');
  surpriseContent.style.display = 'none';
  reasonsList.querySelectorAll('li').forEach(li => li.classList.remove('show'));
  document.getElementById('msgSign').classList.remove('show');
}

/* ============ FINAL BUTTON ============ */
document.getElementById('finalBtn').addEventListener('click', ()=>{
  burstConfetti(260);
  setTimeout(()=> burstConfetti(200), 500);
  setTimeout(()=> burstConfetti(200), 1000);
  const el = document.getElementById('finalBtn');
  el.textContent = "You are so, so loved 💖🎉";
});

/* ============ MUSIC TOGGLE ============ */
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let musicOn = false;
musicBtn.addEventListener('click', ()=>{
  musicOn = !musicOn;
  if(musicOn){
    bgMusic.play().catch(()=>{ /* add a source first */ });
    musicBtn.textContent = '🔊';
  } else {
    bgMusic.pause();
    musicBtn.textContent = '🎵';
  }
});

/* ============ KEYBOARD NAV ============ */
document.addEventListener('keydown', (e)=>{
  const current = [...pages].findIndex(p => p.classList.contains('active'));
  if(e.key === 'ArrowRight' && current < pages.length-1) goTo(current+1);
  if(e.key === 'ArrowLeft'  && current > 0) goTo(current-1);
});

/* ============ SPARKLE CURSOR TRAIL ============ */
document.addEventListener('click', (e)=>{
  for(let i=0;i<6;i++){
    const spark = document.createElement('div');
    spark.textContent = '✨';
    spark.style.cssText = `
      position:fixed; left:${e.clientX}px; top:${e.clientY}px;
      font-size:${Math.random()*12+10}px; pointer-events:none; z-index:9999;
      transition: transform .9s ease, opacity .9s ease;
    `;
    document.body.appendChild(spark);
    requestAnimationFrame(()=>{
      spark.style.transform = `translate(${(Math.random()-.5)*120}px, ${(Math.random()-.5)*120}px) scale(0.3)`;
      spark.style.opacity = '0';
    });
    setTimeout(()=> spark.remove(), 950);
  }
});

/* ============ HANDLE ORIENTATION CHANGE ============ */
window.addEventListener('orientationchange', ()=>{
  setTimeout(()=> window.scrollTo(0, 0), 200);
});