let highestZ = 100;

// Open/Close Window Functions
function openWindow(id) {
  const win = document.getElementById(id);
  win.classList.remove('hidden');
  bringToFront(win);
}

function closeWindow(id) {
  const win = document.getElementById(id);
  win.classList.add('hidden');
}

// Bring Window to Front on Click
function bringToFront(win) {
  highestZ++;
  win.style.zIndex = highestZ;
}

// Make Windows Draggable
document.querySelectorAll('.window').forEach(win => {
  const header = win.querySelector('.title-bar');
  let isDragging = false;
  let offsetX = 0, offsetY = 0;

  win.addEventListener('mousedown', () => bringToFront(win));

  if (header) {
    header.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      win.style.left = `${e.clientX - offsetX}px`;
      win.style.top = `${Math.max(24, e.clientY - offsetY)}px`; // Keep below top menu bar
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  }
});

// Real-Time Menu Bar Clock
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById('clock').innerText = timeString;
}

setInterval(updateClock, 1000);
updateClock();