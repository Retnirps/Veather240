const apiKey = "e2f9fa49ccc2eda612d8a456b82f4720";

async function getWeatherByCityName(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        return City.buildModelFromJson(json);
    } else {
        return response.status;
    }
}

async function getWeatherByCoordinates(latitude, longitude) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        return City.buildModelFromJson(json);
    } else {
        return response.status;
    }
}