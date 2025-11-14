const overlay = document.getElementById('lock-overlay');
const pwInput = document.getElementById('password');
const msg = document.getElementById('msg');
const unlockBtn = document.getElementById('unlockBtn');
const cancelBtn = document.getElementById('cancelBtn');
const siteRoot = document.getElementById('site-root');

pwInput.focus();
let tries = 0;
const maxTries = 3;

async function checkPw() {
  const input = pwInput.value.trim();

  try {
    const response = await fetch('/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: input })
    });

    const data = await response.json();

    if (data.ok) {
      unlock();
    } else {
      tries++;
      msg.textContent = `Access Code invalid. (${maxTries - tries} attempts remaining.)`;
      pwInput.value = '';
      if (tries >= maxTries) {
        msg.textContent = `Too many attempts. Redirecting...`;
        setTimeout(() => window.location.href = 'https://google.com', 1000);
      }
    }
  } catch (err) {
    console.error(err);
    msg.textContent = 'Error checking password. Try again.';
  }
}

unlockBtn.addEventListener('click', checkPw);
pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') checkPw(); });
cancelBtn.addEventListener('click', () => window.location.href = 'https://google.com');

function unlock() {
  overlay.style.transition = 'opacity 0.6s ease';
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
    siteRoot.style.display = 'flex';
    window.sessionStorage.setItem('cirraUnlocked', 'true');
    initCharts();
  }, 600);
}

if (window.sessionStorage.getItem('cirraUnlocked') === 'true') {
  overlay.style.display = 'none';
  siteRoot.style.display = 'flex';
  initCharts();
}

const sidebarItems = document.querySelectorAll('#sidebar nav ul li');
const sections = document.querySelectorAll('main section');

sidebarItems.forEach((item, idx) => {
  item.addEventListener('click', () => {
    sections.forEach(sec => sec.classList.add('hidden'));
    sections[idx].classList.remove('hidden');
  });
});

function initCharts() {
  const charts = document.querySelectorAll('.chart-card canvas');
  charts.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Flights',
          data: Array.from({length:7}, () => Math.floor(Math.random() * 200 + 50)),
          backgroundColor: 'rgba(77, 166, 255, 0.2)',
          borderColor: '#4da6ff',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#4da6ff'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#aaa' }, grid: { color: '#222' } },
          y: { ticks: { color: '#aaa' }, grid: { color: '#222' } }
        }
      }
    });
  });
}

const mapCard = document.querySelector('.placeholder-map');
mapCard.addEventListener('click', () => alert('This would open the interactive airport map!'));
