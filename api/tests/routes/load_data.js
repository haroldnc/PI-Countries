try {
   var { Country, Tourist_activity } = require('../../src/db');
} catch(err) {
   console.error(err);
}


function getUnsortedSubArray(arr, length) {
   const array = [...arr];

   if (arr.length < length) return array;

   const new_arr = [];
   let k;
   
   for(let i=0; i<length; i++){
      k = Math.floor(Math.random() * array.length);
      new_arr.push(array.splice(k,1)[0]);
   }

   return new_arr;
}


function getUnsortedCountriesId(countries) {
   const len = 1 + Math.floor(Math.random() * countries.length);
   return getUnsortedSubArray(countries, len).map(country => country.id);
}


/*        Creamos la data         */
const countries = [];
const activities = [];
const no_seasons = [];
let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let seasons = ["Summer","Fall","Winter","Spring"]
let j, k, l;

for (let i=0; i<21; i++){
   j = Math.floor(Math.random() * 7);
   k = Math.floor(Math.random() * 15);

   countries.push({
      id: `pa${letters[i]}`,
      name: `pais${i}`,
      flag: `flag${i}`,
      continent: `continent${j}`,
      capital: `capital${i}`,
      subregion: `subregion${k}`,
      area: 1000*j+100*k,
      population: 1000*k+100*j
   });
}

for (let i=0; i<7; i++){
   j = 1 + Math.floor(Math.random() * 5);
   k = 1 + Math.floor(Math.random() * 30);
   l = Math.floor(Math.random() * 4);

   activities.push({
      name: `activity${i}`,
      difficulty: j,
      duration: k,
      season: seasons[l],
      countriesId: getUnsortedCountriesId(countries)
   });

   no_seasons.push(getUnsortedSubArray(letters.split(''), k).join(''));
}

module.exports = {
   countries,
   activities,
   no_seasons
}