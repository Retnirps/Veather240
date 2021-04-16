const defaultLatitude = 59.8944;   //      |Saint Petersburg
const defaultLongitude = 30.2642;  //      |

const form = document.querySelector(".add-city");
const input = document.querySelector(".edit-text input");

form.addEventListener("submit", e => {
    e.preventDefault();
    createCityWindow(input.value.trim(), false).then();
    input.value = "";
});

window.onload = function() {
    getLocation();
    restore().then();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, defaultLocation);
    }
}

async function showLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    await updateMainCityCard(latitude, longitude);
}

async function defaultLocation() {
    await updateMainCityCard(defaultLatitude, defaultLongitude);
}

async function restore() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let name = localStorage.getItem(key);
        await createCityWindow(name, true);
    }
}