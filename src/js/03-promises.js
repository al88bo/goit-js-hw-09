import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', letsCreatePromises);

function letsCreatePromises(e) {
  e.preventDefault();
  let delay = +e.target[0].value;
  const step = +e.target[1].value;
  const amount = +e.target[2].value;
  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
