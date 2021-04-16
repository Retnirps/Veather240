const ul = document.querySelector(".other-cities");
const main = document.querySelector("main");
const warning = document.querySelector(".warning");

async function createCityWindow(city, restoreFlag) {
    if (city.length !== 0) {
        const li = document.createElement("li");
        li.classList.add("city-window");
        li.innerHTML = `<div class="loading"></div>`;
        ul.appendChild(li);
        let info = await getWeatherByCityName(city);
        if (info !== 404) {
            let id = `${info.name},${info.country}`;
            if (restoreFlag === false) {
                let response = await saveCityToFavourites(`${info.name},${info.country}`);
                if (response.ok) {
                    li.id = id;
                    updateCityWindow(info);
                } else {
                    ul.removeChild(li);
                    showWarning("city already in favourites");
                }
            } else {
                li.id = id;
                updateCityWindow(info);
            }
        } else {
            showWarning("city doesn't exist");
            ul.removeChild(li);
        }
    } else {
        showWarning("no city entered");
    }
}

function showWarning(message) {
    warning.innerHTML = message;
    warning.style.display = "inline";
}

function hideWarning() {
    warning.style.display = "none";
}

function updateCityWindow(city) {
    const li = document.createElement("li");
    li.classList.add("city-window")
    let id = `${city.name},${city.country}`;
    li.id = id;
    let cityWindowContent = fillCityWindowTemplate(city)
    li.appendChild(cityWindowContent)
    const cityLoading = document.getElementById(id);
    ul.replaceChild(li, cityLoading);
}

async function updateMainCityCard(latitude, longitude) {
    const loadingCard = document.createElement("section");
    loadingCard.classList.add("city-card");
    loadingCard.innerHTML = `<div class="loading"></div>`;
    let cardOld = document.querySelector(".city-card");
    main.replaceChild(loadingCard, cardOld);

    let info = await getWeatherByCoordinates(latitude, longitude);

    const card = document.createElement("section");
    card.classList.add("city-card");
    let cardContent = fillMainCardTemplate(info);
    card.appendChild(cardContent);
    cardOld = document.querySelector(".city-card");
    main.replaceChild(card, cardOld);
}

async function removeCityWindow(obj) {
    obj.parentElement.parentElement.remove();
    await deleteCityFromFavourites(obj.parentElement.parentElement.id);
}

function fillCityWindowTemplate(city) {
    let cityWindowTemplate = template_card.content.cloneNode(true);

    let cityTitle = cityWindowTemplate.querySelector(".city-title");
    let smallTemperature = cityWindowTemplate.querySelector(".small-temperature");
    let img = cityWindowTemplate.querySelector("img");

    cityTitle.textContent = `${city.name}, ${city.country}`;
    smallTemperature.textContent = `${city.temperature}°C`;
    img.src = city.icon;

    fillValues(cityWindowTemplate, city)

    return document.importNode(cityWindowTemplate, true);
}

function fillMainCardTemplate(city) {
    let mainCardTemplate = main_card.content.cloneNode(true);

    let cityTitleBig = mainCardTemplate.querySelector(".city-title-big");
    let img = mainCardTemplate.querySelector(".weather-icon");
    let temperature = mainCardTemplate.querySelector(".temperature");

    cityTitleBig.textContent = `${city.name}, ${city.country}`;
    img.src = city.icon;
    temperature.textContent = `${city.temperature}°C`;

    fillValues(mainCardTemplate, city);

    return document.importNode(mainCardTemplate, true);
}

function fillValues(template, city) {
    let feelsLike = template.querySelector(".feels-like .weather-item-value");
    let wind = template.querySelector(".wind .weather-item-value");
    let cloudiness = template.querySelector(".cloudiness .weather-item-value");
    let pressure = template.querySelector(".pressure .weather-item-value");
    let humidity = template.querySelector(".humidity .weather-item-value");
    let coordinates = template.querySelector(".coordinates .weather-item-value");

    feelsLike.textContent = `${city.feelsLike}°C`;
    wind.textContent = `${city.windDirection}, ${city.windSpeed} m/s`;
    cloudiness.textContent = city.cloudiness;
    pressure.textContent = `${city.pressure} hpa`;
    humidity.textContent = `${city.humidity}%`;
    coordinates.textContent = `[${city.latitude}; ${city.longitude}]`;
}