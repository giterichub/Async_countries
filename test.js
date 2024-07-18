const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = data => {
  const html = `<article class="country">
<img class="country__img" src="${data.flag}" />
<div class="country__data">
  <h3 class="country__name">${data.name}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
    1
  )} people</p>
  <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
  <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
</div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html); // study
  countriesContainer.style.opacity = 1;
};
 

const getCountryAndNeighbour = country => {
  // First AJAX call for the main country
  const request = new XMLHttpRequest();
  request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
  request.send();
  
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText); // `this` is `request`
    renderCountry(data);

    // Get the neighbour country (if exists)
    const neighbour = data.borders?.[0];
    if (!neighbour) return; // If there are no neighbours, exit function

    // Second AJAX call for the neighbour country
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText); // `this` is `request2`
			console.log(data2)
      renderCountry(data2);
    });
  });
};

 
getCountryAndNeighbour('portugal');