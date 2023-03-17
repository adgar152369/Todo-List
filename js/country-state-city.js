let Country = require('country-state-city').Country;
let State = require('country-state-city').State;
let City = require('country-state-city').City;


const countries = Country.getAllCountries();
const states = State.getAllStates();
const cities = City.getAllCities();
const countryNames = [];
const stateNames = [];
const cityNames = [];

countries.forEach(country => {
    countryNames.push(country);
});
states.forEach(state => {
    stateNames.push(state);
});
cities.forEach(city => {
    cityNames.push(city);
});

module.exports = { countryNames, stateNames, cityNames };