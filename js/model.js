class City {
    name;
    country;
    temperature;
    feelsLike;
    windDirection;
    windSpeed;
    cloudiness;
    pressure;
    humidity;
    latitude;
    longitude;
    icon;

    toString() {
        return "name: " + this.name + "\n" +
            "country: " + this.country + "\n" +
            "temperature: " + this.temperature + "\n" +
            "feels like: " + this.feelsLike + "\n" +
            "wind degree: " + this.windDirection + "\n" +
            "wind speed: " + this.windSpeed + "\n" +
            "cloudiness: " + this.cloudiness + "\n" +
            "pressure: " + this.pressure + "\n" +
            "humidity: " + this.humidity + "\n" +
            "latitude: " + this.latitude + "\n" +
            "longitude: " + this.longitude + "\n" +
            "icon: " + this.icon + "\n";
    }

    static buildModelFromJson(cityJson) {
        let city = new City();
        city.name = cityJson.name;
        city.country = cityJson.sys.country;
        city.temperature = Math.round(cityJson.main.temp);
        city.feelsLike = Math.round(cityJson.main.feels_like);
        city.windDirection = this.getWindDirection(cityJson.wind.deg);
        city.windSpeed = cityJson.wind.speed;
        city.cloudiness = cityJson.weather[0].description;
        city.pressure = cityJson.main.pressure;
        city.humidity = cityJson.main.humidity;
        city.latitude = cityJson.coord.lat;
        city.longitude = cityJson.coord.lon;
        city.icon = `https://openweathermap.org/img/wn/${cityJson.weather[0].icon}@4x.png`;

        return city;
    }

    static getWindDirection(deg) {
        if (deg > 337.5) {
            return "North";
        }
        if (deg > 292.5) {
            return "North-west";
        }
        if (deg > 247.5) {
            return "West";
        }
        if (deg > 202.5) {
            return "South-west";
        }
        if (deg > 157.5) {
            return "South";
        }
        if (deg > 122.5) {
            return "South-east";
        }
        if (deg > 67.5) {
            return "East";
        }
        if (deg > 22.5) {
            return "North-east";
        }
        return "North";
    }
}