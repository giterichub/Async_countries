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
            const request2 = new XMLHttpRequest();
            request2.open('GET', `https://restcountries.com/v3.1/alpha/${borderCountry}`);
            request2.send();

        request2.addEventListener('load', function(){
            const [data2] = JSON.parse(request2.responseText);
            drawFlag(data2, 'neighbour');
        });
    });
};

const getCountryAndNeighbor = function(country){
    const request1 = new XMLHttpRequest();
    request1.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request1.send();

    request1.addEventListener('load', function(){
        const [data1] = JSON.parse(request1.responseText);
        drawFlag(data1);
        getNeighbouringCountries(data1.borders);
    });
};
getCountryAndNeighbor('portugal');
setTimeout(() => {
    getCountryAndNeighbor('spain');
}, 1000);
setTimeout(() => {
    getCountryAndNeighbor('mexico');
}, 2000);

// document.documentElement.style.setProperty('--variable-name', ` '${data1.name.common} Neighbour Country' `);
// request.open('GET', `https://restcountries.com/v3.1/name/${country}?fullText=true`);
// from the above line how the api searches can cause different issues, for example in this case if we search for taiwan
// the api searches  not only by a common name, like "Taiwan", but also by official name, 
// and the official name for Taiwan is the "Republic of China". 
// So, the API will return all countries (or special administrative regions) that have a string "china" in either the common 
// or official name. There are four records that meet that criteria, and these are for China, Taiwan, Hong Kong and Macau.
// If you want to search exactly for the country name, for example, exactly for "China", 
// you can add the fullText=true parameter to the url