import { fetchCatByBreed, fetchBreeds } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectEl = document.querySelector('.breed-select');

const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catsEl = document.querySelector('.cat-info');

selectEl.classList.add('is-hidden');
errorEl.classList.add('is-hidden');

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
    errorEl.classList.remove('is-hidden');
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
      errorEl.classList.remove('is-hidden');
    });
});

function showCat(cat) {
  const imgEl = `<img src="${cat.url}" width="300px" />`;
  const infoEl = `<div><h2>${cat.breeds[0].name}</h2><p>${cat.breeds[0].description}</p><p>${cat.breeds[0].temperament}</p></div>`;
  catsEl.insertAdjacentHTML('beforeend', imgEl);
  catsEl.insertAdjacentHTML('beforeend', infoEl);
}
