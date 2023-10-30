import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timer = document.querySelector('.timer');
timer.style.display = 'flex';
timer.style.gap = '15px';
timer.style.marginTop = '10px';

[...timer.children].forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
});

let intervalId = null;
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');
const inputField = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedTime = selectedDates[0].getTime();
    if (selectedTime <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
    startBtn.addEventListener('click', () => {
      inputField.disabled = true;
      startBtn.disabled = true;
      intervalId = setInterval(toDisplayTimer, 1000, selectedTime);
    });
  },
};

flatpickr(inputField, options);

//      M E T H O D S

function toDisplayTimer(selectedTime) {
  const diff = selectedTime - Date.now();
  if (diff <= 0) clearInterval(intervalId);
  else renderTimerMarkup(addLeadingZero(convertMs(diff)));
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(obj) {
  for (const key in obj) obj[key] = obj[key].toString().padStart(2, '0');
  return obj;
}

function renderTimerMarkup(obj) {
  daysField.textContent = obj.days;
  hoursField.textContent = obj.hours;
  minutesField.textContent = obj.minutes;
  secondsField.textContent = obj.seconds;
}
