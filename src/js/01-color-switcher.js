const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

function onStart() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerId = setInterval(() =>
        body.style.backgroundColor = getRandomHexColor(), 1000);
}

function onStop() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}