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
        city.country = cityJson.country;
        city.temperature = cityJson.temperature;
        city.feelsLike = cityJson.feelsLike;
        city.windDirection = cityJson.windDirection;
        city.windSpeed = cityJson.windSpeed;
        city.cloudiness = cityJson.cloudiness;
        city.pressure = cityJson.pressure;
        city.humidity = cityJson.humidity;
        city.latitude = cityJson.latitude;
        city.longitude = cityJson.longitude;
        city.icon = cityJson.icon;

        return city;
    }
}