const overlay = document.getElementById('lock-overlay');
const pwInput = document.getElementById('password');
const msg = document.getElementById('msg');
const unlockBtn = document.getElementById('unlockBtn');
const cancelBtn = document.getElementById('cancelBtn');
const siteRoot = document.getElementById('site-root');
window.Alert(`Please be aware that none of the buttons on this site will function. (demo page)`)
pwInput.focus();

let tries = 0;
const maxTries = 3;

unlockBtn.addEventListener('click', checkPw);
pwInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkPw();
});

cancelBtn.addEventListener('click', () => {
  document.documentElement.innerHTML = '';
  window.location.href = 'https://google.com';
});

async function checkPw() {
  try {
    const response = await fetch('/auth', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({password: pwInput.value.trim()})
    });

    const data = await response.json();

    if (data.ok) unlock();
    else fail();
  } catch {
    fail();
  }
}

function fail() {
  tries++;
  msg.textContent = `Access Code invalid. (${maxTries - tries} attempts remaining.)`;
  pwInput.value = '';
  if (tries >= maxTries) {
    msg.textContent = `You've reached the attempt limit. Redirecting.`;
    setTimeout(() => window.location.href = 'https://google.com', 1000);
  }
}

function unlock() {
  overlay.style.transition = 'opacity 0.6s ease';
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
    document.body.classList.remove('locked');
    siteRoot.style.display = 'block';
    siteRoot.style.opacity = '1';
  }, 600);
}
