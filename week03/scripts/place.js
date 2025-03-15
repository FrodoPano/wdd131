function calculateWindChill(temp, windSpeed) {
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16));
}

document.addEventListener('DOMContentLoaded', () => {
    const temp = 19; // Static temperature in °C
    const windSpeed = 10; // Static wind speed in km/h

    let windChill = "N/A";
    if (temp <= 10 && windSpeed > 4.8) {
        windChill = calculateWindChill(temp, windSpeed).toFixed(1) + " °C";
    }

    document.getElementById('windChill').textContent = windChill;

    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = lastModified;
});