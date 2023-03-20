export function markupCountryInfo({ flags, name, capital, population, languages }) {
  languages = Object.values(languages).join(', ');
  return `
      <img src="${flags.svg}" alt="${name.official}" width="100" />
      <p>${name.official}</p>
      <p>Capital: <span>${capital}</span></p>
      <p>Population: <span>${population}</span></p>
      <p>Languages: <span>${languages}</span></p>
  `;
}

export function markupCountryList({ flags, name }) {
  return `
  <li>
    <img src="${flags.svg}" alt="${name.official}" width="35" />
    <span>${name.official}</span>
  </li>
  `;
}