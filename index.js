// Cirra Systems
const overlay = document.getElementById('lock-overlay');
const pwInput = document.getElementById('password');
const msg = document.getElementById('msg');
const unlockBtn = document.getElementById('unlockBtn');
const cancelBtn = document.getElementById('cancelBtn');
const siteRoot = document.getElementById('site-root');

pwInput.focus();
let tries = 0;
const maxTries = 3;

unlockBtn.addEventListener('click', checkPw);
pwInput.addEventListener('keydown', e => { if(e.key === 'Enter') checkPw(); });
cancelBtn.addEventListener('click', () => { window.location.href='https://google.com'; });

async function checkPw() {
  const input = pwInput.value.trim();
  if (!input) return;

  try {
    const res = await fetch('/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: input })
    });

    const data = await res.json();

    if (data.ok) unlock();
    else {
      tries++;
      msg.textContent = `Access Code invalid. (${maxTries - tries} attempts remaining.)`;
      pwInput.value = '';
      if(tries >= maxTries){
        msg.textContent='Max attempts reached. Redirecting...';
        setTimeout(()=>window.location.href='https://google.com',1000);
      }
    }
  } catch(e) {
    console.error('Error checking password:', e);
    msg.textContent = 'Error checking password. Try again.';
  }
}

function unlock() {
  overlay.style.opacity = 0;
  setTimeout(()=>{
    overlay.style.display='none';
    document.body.classList.remove('locked');
    siteRoot.style.display='block';
    siteRoot.style.opacity='1';
  },600);
}

// SIDEBAR TOGGLE
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('sidebar-toggle');
if(toggleBtn){
  toggleBtn.addEventListener('click', ()=> sidebar.classList.toggle('show'));
}
