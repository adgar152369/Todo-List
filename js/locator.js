// const countryChange = document.querySelector('select#country');
// const countryCodes = document.querySelectorAll('option');
// const stateChange = document.querySelector('select#state');
// // const states = [...stateChange.children];
// const addNewPlaceForm = document.querySelector('#add-new-place');

import { Country, State, City }  from 'country-state-city';


function searchPlaces(input) {
    const matchingCountries = Country.getCountryByName(input);
    let result = [];
    if (matchingCountries.length > 0) {
        result.push(...matchingCountries);
        const matchingStates = State.getStatesOfCountry(matchingCountries[0].isoCode);
        if (matchingStates.length > 0) {
            result.push(...matchingStates);
            const matchingCities = City.getCitiesOfState(matchingStates[0].isoCode, matchingStates[0].countryCode);
            result.push(...matchingCities);
        }
    } else {
        const matchingStates = csc.getStatesOfCountry(input);
        if (matchingStates.length > 0) {
            result.push(...matchingStates);
            const matchingCities = City.getCitiesOfState(matchingStates[0].isoCode, matchingStates[0].countryCode);
            result.push(...matchingCities);
        }
    }
    console.log(result);
    return result;
}

