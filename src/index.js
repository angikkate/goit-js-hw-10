import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { refs } from './js/refs';
import { fetchCountries } from './js/fetchCountries';
import { markupCountryInfo, markupCountryList } from './js/markupCountries';

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  e.preventDefault();

  const countryName = refs.searchBox.value.trim();
  if (!countryName) {
    clearInner();
    return;
  }

  fetchCountries(countryName)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        clearInner();
        return;
      }

      if (countries.length === 1) {
        const markup = countries.map(country => markupCountryInfo(country));
        refs.countryInfo.innerHTML = markup.join('');
        refs.countryList.innerHTML = '';
      }

      if (countries.length >= 2 && countries.length <= 10) {
        const listMarkup = countries.map(country => markupCountryList(country));
        refs.countryList.innerHTML = listMarkup.join('');
        refs.countryInfo.innerHTML = '';
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      clearInner();
      return error;
    });
}

function clearInner() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}