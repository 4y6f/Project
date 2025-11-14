const overlay = document.getElementById('lock-overlay');
const pwInput = document.getElementById('password');
const msg = document.getElementById('msg');
const unlockBtn = document.getElementById('unlockBtn');
const cancelBtn = document.getElementById('cancelBtn');
const siteRoot = document.getElementById('site-root');

pwInput.focus();

unlockBtn.addEventListener('click', checkPw);
pwInput.addEventListener('keydown', e => { if(e.key==='Enter') checkPw(); });
cancelBtn.addEventListener('click', () => { window.location.href='https://google.com'; });

let tries=0; const maxTries=3;

async function checkPw() {
  const input = pwInput.value.trim();
  try {
    const res = await fetch('/auth',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({password:input})});
    const data = await res.json();
    if(data.ok) unlock(); else fail();
  } catch(err){ fail(); }
}

function fail() {
  tries++;
  msg.textContent = `Access Code invalid. (${Math.max(0,maxTries-tries)} attempts left)`;
  pwInput.value='';
  if(tries>=maxTries) setTimeout(()=>window.location.href='https://google.com',1000);
}

function unlock(){
  overlay.style.opacity=0;
  setTimeout(()=>overlay.style.display='none',500);
  siteRoot.style.display='block';
}
