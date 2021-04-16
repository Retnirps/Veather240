async function getWeatherByCityName(city) {
    let url = `https://pure-caverns-60689.herokuapp.com/weather/city?q=${city}`;

    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        return City.buildModelFromJson(json);
    } else {
        return response.status;
    }
}

async function getWeatherByCoordinates(latitude, longitude) {
    let url = `https://pure-caverns-60689.herokuapp.com/weather/coordinates?lat=${latitude}&lon=${longitude}`;

    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        return City.buildModelFromJson(json);
    } else {
        return response.status;
    }
}

async function saveCityToFavourites(fullCityName) {
    const url = `https://pure-caverns-60689.herokuapp.com/weather/favourites?city=${fullCityName}`;

    return await fetch(url, {
        method: "POST"
    });
}

async function deleteCityFromFavourites(fullCityName) {
    const url = `https://pure-caverns-60689.herokuapp.com/weather/favourites?city=${fullCityName}`;

    return await fetch(url, {
        method: "DELETE"
    });
}

async function getFavourites() {
    const url = `https://pure-caverns-60689.herokuapp.com/weather/favourites`;
    const favourites = [];

    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        for (let i = 0; i < json.length; i++) {
            favourites[i] = json[i].city;
        }
        return favourites;
    } else {
        return response.status;
    }
}
