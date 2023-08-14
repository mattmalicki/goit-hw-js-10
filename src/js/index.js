import { fetchCatByBreed, fetchBreeds } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectEl = document.querySelector('.breed-select');

const loaderEl = document.querySelector('.loader');
const catsEl = document.querySelector('.cat-info');

selectEl.classList.add('is-hidden');

fetchBreeds()
  .then(function (response) {
    for (const cat of response) {
      selectEl.insertAdjacentHTML(
        'beforeend',
        `<option value="${cat.id}">${cat.name}</option>`
      );
    }
    loaderEl.classList.add('is-hidden');
    selectEl.classList.remove('is-hidden');
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(function () {
    new Notify.failure('Ops. Something went wrong. Try reloading page...', {
      timeout: 10000,
      width: '500px',
      backOverlay: true,
      position: 'center-center',
    });
  });

selectEl.addEventListener('change', function (event) {
  catsEl.innerHTML = '';
  loaderEl.classList.toggle('is-hidden');
  fetchCatByBreed(event.target.value)
    .then(function (response) {
      loaderEl.classList.toggle('is-hidden');
      showCat(response);
    })
    .catch(function () {
      new Notify.failure('Ops. Something went wrong. Try reloading page...', {
        timeout: 10000,
        width: '500px',
        backOverlay: true,
        position: 'center-center',
      });
    });
});

function showCat(cat) {
  const imgEl = `<div class='cat-info__img'><img src="${cat.url}" alt="${cat.breeds[0].name}" class="cat-info__img-size" /></div>`;
  const infoEl = `<div class="cat-info__info"><h2 class="cat-info__name">${cat.breeds[0].name}</h2><p class="cat-info__temperament">${cat.breeds[0].description}</p><p>${cat.breeds[0].temperament}</p></div>`;
  catsEl.insertAdjacentHTML('beforeend', infoEl);
  catsEl.insertAdjacentHTML('beforeend', imgEl);
}
