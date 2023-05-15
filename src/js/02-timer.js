import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.getElementById('datetime-picker');

const startBtn = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');
const refs = {
  days: timerEl.querySelector('[data-days]'),
  hours: timerEl.querySelector('[data-hours]'),
  minutes: timerEl.querySelector('[data-minutes]'),
  seconds: timerEl.querySelector('[data-seconds]'),
};

let targetTime;
let timerId = null;
startBtn.disabled = true;

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetTime = selectedDates[0].getTime();
    checkSelectedDate();
  },
};

flatpickr(inputEl, flatpickrOptions);

function checkSelectedDate() {
    if (Date.now() >= targetTime) {
      //window.alert('Please choose a date in the future');
        Notify.failure('Please choose a date in the future', {clickToClose: true,});
    } else {
        startBtn.removeAttribute('disabled');
        Notify.success('Click "Start" to start the timer', {
          clickToClose: true,
        });
    }    
}

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    inputEl.setAttribute('disabled', '');

    timerId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = targetTime - currentTime;
        const timerData = convertMs(deltaTime);

        updateTimerFace(timerData);

        if (
          !timerData.hours &&
          !timerData.minutes &&
          !timerData.seconds &&
          !timerData.days
        ) {
          clearTimer();
        }
    }, 1000);
    
} );

function clearTimer() {
    Notify.info('The timer is cleared, select a new date');
    inputEl.removeAttribute('disabled');
    clearInterval(timerId);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

