const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const drawFlag = function (data1, className = '') {
  const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data1.flags.png}" />
            <div class="country__data">
            <h3 class="country__name">${data1.name.common}</h3>
            <h4 class="country__region">${data1.region}</h4>
            <p class="country__row"><span>👫</span>${((data1.population) / 1000000).toFixed(1)}M</p>
            <p class="country__row"><span>🗣️</span>${data1.languages[Object.keys(data1.languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data1.currencies[Object.keys(data1.currencies)[0]].name}</p>
            </div>
        </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

const fetchCountry = function (code) {
  return fetch(`https://restcountries.com/v3.1/alpha/${code}`)
    .then(response => {
      if (!response.ok) throw new Error(`Neighbor country not found (${response.status})`);
      return response.json();
    });
}

const getCountryAndNeighbor = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then(response => {
    if (!response.ok) throw new Error(`Country not found ${response.status}`);
    return response.json();
  })
    .then(data => {
      const [countryData] = data;
      drawFlag(countryData);

      const neighbourCountriesArray = countryData.borders;
      if (!neighbourCountriesArray) throw new Error(`No neighbouring country found`);;

      const fetchedCountries = neighbourCountriesArray.map(code => fetchCountry(code));
      return Promise.all(fetchedCountries);
    })
    .then(neighborData => {
      neighborData.forEach(data => drawFlag(data[0], 'neighbour'));

      const allNeighborBorders = neighborData
        .flatMap(neighbour => neighbour[0].borders || []);
      const uniqueNeighborBorders = [...new Set(allNeighborBorders)];

      const fetchedCountries2 = uniqueNeighborBorders.map(code => fetchCountry(code));
      return Promise.all(fetchedCountries2);
    })
    .then(nData => {
      nData.forEach(data => drawFlag(data[0], 'neighbour1'));
    })
    .catch(err => {
      console.error(`${err} 💥`);
      countriesContainer.insertAdjacentText('beforeend', `Something went wrong. ${err.message} 💥💥`);
    })
    .finally(countriesContainer.style.opacity = 1)
}

getCountryAndNeighbor('portugal');
// setTimeout(() => {
//     getCountryAndNeighbor('spain');
// }, 1000);
// setTimeout(() => {
//     getCountryAndNeighbor('mexico');
// }, 2000);


// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// const drawFlag = function(data1, className = ''){
//     const html = `
//         <article class="country ${className}">
//             <img class="country__img" src="${data1.flags.png}" />
//             <div class="country__data">
//             <h3 class="country__name">${data1.name.common}</h3>
//             <h4 class="country__region">${data1.region}</h4>
//             <p class="country__row"><span>👫</span>${((data1.population)/1000000).toFixed(1)}M</p>
//             <p class="country__row"><span>🗣️</span>${data1.languages[Object.keys(data1.languages)[0]]}</p>
//             <p class="country__row"><span>💰</span>${data1.currencies[Object.keys(data1.currencies)[0]].name}</p>
//             </div>
//         </article>
//     `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
// }

// const getCountryAndNeighbor = function(country){
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//         const [countryData] = data;
//         drawFlag(countryData);

//         const neighbourCountriesArray = countryData.borders;
//         if(!neighbourCountriesArray) return;

//         console.log(neighbourCountriesArray);
//         // In the below function we have to return something to fetchedCountries, so in map function if we write 
//         // .map(country =>{}), if there are curly braces, then we have to use the return keyword specifically, 
//         // we use it for the fetch to return the fetch and its responses so that fetchedCountries has some value to be stored.
//         // If no curly braces then we don't need to write the return staement, it is assumed that the fetch response will be returned.
//         // Also for this type syntax variable = some function, also return value some be there, otherwise undefined will be stored in the
//         //variable, and that same undefined in this case will be used for Promise.all() and so on. 
//         const fetchedCountries = neighbourCountriesArray.map(country =>
//             fetch(`https://restcountries.com/v3.1/alpha/${country}`)
//             .then(response => {
//                 if (!response.ok) throw new Error(`Neighbor country not found (${response.status})`);
//                 return response.json();
//             })
//         );

//         return Promise.all(fetchedCountries);
//     })
//     .then(neighborData => {
//         neighborData.forEach(data => drawFlag(data[0], 'neighbour'));
//         let tempVar = [];
//         neighborData.forEach(neighbour => {
//            tempVar = neighbour[0].borders;
//         });

//         const fetchedCountries2 = tempVar.map(country =>
//             fetch(`https://restcountries.com/v3.1/alpha/${country}`)
//             .then(response => {
//                 if (!response.ok) throw new Error(`Neighbor country not found (${response.status})`);
//                 return response.json();
//             })
//         );
//         return Promise.all(fetchedCountries2);
//     })
//     .then(nData => nData.forEach(data => drawFlag(data[0], 'neighbour1')))
// };
//  getCountryAndNeighbor('mexico');
// // setTimeout(() => {
// //     getCountryAndNeighbor('spain');
// // }, 1000);
// // setTimeout(() => {
// //     getCountryAndNeighbor('mexico');
// // }, 2000);


// const getCountryAndNeighbor = function(country){
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//         const [countryData] = data;
//         drawFlag(countryData);

//         const neighbourCountriesArray = countryData.borders;
//         if(!neighbourCountriesArray) return;
//             return fetch(`https://restcountries.com/v3.1/alpha/${neighbourCountriesArray[0]}`)
//     })
//     .then(response => response.json())
//     .then(data => drawFlag(data[0], 'neighbour'))
// };
