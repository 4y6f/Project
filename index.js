const pw = "the-av-times";
const overlay = document.getElementById('lock-overlay');
const pwInput = document.getElementById('password');
const msg = document.getElementById('msg');
const unlockBtn = document.getElementById('unlockBtn');
const cancelBtn = document.getElementById('cancelBtn');
const siteRoot = document.getElementById('site-root');

const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

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

function checkPw() {
  const input = pwInput.value.trim();
  if (input === pw) {
    unlock();
  } else {
    tries++;
    msg.textContent = `Access Code invalid. (${maxTries - tries} attempts remaining.)`;
    pwInput.value = '';
    if (tries >= maxTries) {
      msg.textContent = `You've reached the attempt limit. Redirecting.`;
      setTimeout(() => {
        document.documentElement.innerHTML = '';
        window.location.href = 'https://google.com';
      }, 1000);
    }
  }
}

function unlock() {
  overlay.style.transition = 'opacity 0.6s ease';
  overlay.style.opacity = '0';

  setTimeout(() => {
    overlay.style.display = 'none';
    document.body.classList.remove('locked');
    siteRoot.style.display = 'block';
    setTimeout(() => {
      siteRoot.style.opacity = '1';
    }, 50);
  }, 600);
}
