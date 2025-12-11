// If you're looking for the password it isnt here
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

    if (data.ok) QxOMJGZrKotRUhZ3S();
    else lmEUKseksEXX0B2oH();
  } catch {
    lmEUKseksEXX0B2oH();
  }
}

function lmEUKseksEXX0B2oH() {
  tries++;
  msg.textContent = `Access Code invalid. (${maxTries - tries} attempts remaining!)`;
  pwInput.value = '';
  if (tries >= maxTries) {
    msg.textContent = `You've reached the attempt limit. Redirecting.`;
    setTimeout(() => window.location.href = 'https://google.com', 1000);
  }
}

function QxOMJGZrKotRUhZ3S() {
  overlay.style.transition = 'opacity 0.6s ease';
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
    document.body.classList.remove('locked');
    siteRoot.style.display = 'block';
    siteRoot.style.opacity = '1';
  }, 600);
}

function showConsoleWarning() {
  console.log("%cWARNING:", "color: red; font-size: 300%;");
    console.log("The browser console is a developer tool and is not intended for use by regular users. DO NOT copy and paste any code in this window unless you understand what it does and trust the developer.");
}

showConsoleWarning();

document.querySelectorAll("button.primary").forEach(btn => {
  if (btn.textContent.includes("Track")) {
    btn.addEventListener("click", () => {
      document.getElementById("trackerModal").style.display = "flex";
    });
  }
});

document.getElementById("closeTracker").addEventListener("click", () => {
  document.getElementById("trackerModal").style.display = "none";
