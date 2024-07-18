const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const drawFlag = function(data1, className = ''){
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data1.flags.png}" />
            <div class="country__data">
            <h3 class="country__name">${data1.name.common}</h3>
            <h4 class="country__region">${data1.region}</h4>
            <p class="country__row"><span>👫</span>${((data1.population)/1000000).toFixed(1)}M</p>
            <p class="country__row"><span>🗣️</span>${data1.languages[Object.keys(data1.languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data1.currencies[Object.keys(data1.currencies)[0]].name}</p>
            </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

const getNeighbouringCountries = function(borders){
    borders.forEach(borderCountry => {
        if(!borderCountry) return;
            fetch(`https://restcountries.com/v3.1/alpha/${borderCountry}`)
            .then(response => response.json())
            .then(data => drawFlag(data[0], 'neighbour'))
    });
};

const getCountryAndNeighbor = function(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
        const [countryData] = data;
        drawFlag(countryData);
        getNeighbouringCountries(countryData.borders);
    })
};
getCountryAndNeighbor('portugal');
setTimeout(() => {
    getCountryAndNeighbor('spain');
}, 1000);
setTimeout(() => {
    getCountryAndNeighbor('mexico');
}, 2000);



// const getCountryAndNeighbor = function(country){
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         const [countryData] = data;
//         drawFlag(countryData);
//         getNeighbouringCountries(countryData.borders);
//     })
// };

// const getNeighbouringCountries = function(borders){
//     borders.forEach(borderCountry => {
//         if(!borderCountry) return;
//             fetch(`https://restcountries.com/v3.1/alpha/${borderCountry}`)
//             .then(response => response.json())
//             .then(function(data){
//                 const [neighbourCountryData] = data;
//                 drawFlag(neighbourCountryData, 'neighbour')
//             })
//     });
// };