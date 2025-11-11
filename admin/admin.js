const overlay = document.getElementById('lock-overlay')
const pwInput = document.getElementById('admin-password')
const msg = document.getElementById('msg')
const unlockBtn = document.getElementById('unlockBtn')

unlockBtn.addEventListener('click', checkPw)
pwInput.addEventListener('keydown', e => { if(e.key==='Enter') checkPw() })

async function checkPw() {
  const pw = pwInput.value.trim()
  const res = await fetch('/admin', { headers: { 'x-site-password': pw }})
  if(res.status === 200){
    overlay.style.opacity = 0
    setTimeout(()=> overlay.style.display='none', 400)
  } else {
    msg.textContent = 'Wrong password'
    pwInput.value = ''
  }
}

document.getElementById('changePwBtn').addEventListener('click', async () => {
  const newPw = document.getElementById('new-password').value
  const res = await fetch('/update-password', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ password: newPw })
  })
  if(res.ok) document.getElementById('pwMsg').textContent='Password updated!'
  else document.getElementById('pwMsg').textContent='Error updating password'
})
