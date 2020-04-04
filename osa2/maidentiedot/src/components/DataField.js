/* eslint-disable */
import React, { useEffect, useState } from 'react'
import Weather from './Weather'

// Handle logic for showing data here (array.length)
const DataField = ({shownData, handleClick}) => {

    // Debug for new data passed to DataField
    console.log(shownData, 'got new data')

    // Too many elements
    if (shownData.length > 10) {
        return (<li>Too many elements</li>)
    }

    // 10 or under
    if (shownData.length < 10 && shownData.length > 1) {
        return (
            shownData.map((country) => <li key={country.numericCode}>{country.name}
            <button onClick={() => handleClick(country)}>show</button></li>)
            )
    }

    // Single, wait for weatherdata
    else if (shownData.length === 1) {
        const country = shownData[0]
        return (
            <div>
                <h1>{country.name}</h1>
                <p>Capital city: {country.capital}</p>
                <p>Population: {country.population}</p>
                <h2>Languages:</h2>
                <ul>
                    {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
                </ul>
                <img src={country.flag} width="450" height="300"/>
                <h2>Weather in {country.capital}</h2>
                <Weather capital={country.capital}/>
            </div>
        );
    }

    // Fallback / empty search
    return (<li></li>);
}

export default DataField