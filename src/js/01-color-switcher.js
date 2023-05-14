const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;


startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    stopBtn.removeAttribute('disabled');
    
    timerId = setInterval(changeBodyColor, 1000)
});

stopBtn.addEventListener('click', () => {
    startBtn.removeAttribute('disabled');
    stopBtn.disabled = true;
    
    clearInterval(timerId);    
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeBodyColor() {
   document.body.style.backgroundColor = getRandomHexColor(); 
};