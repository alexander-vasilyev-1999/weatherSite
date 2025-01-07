document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const temperatureRes = document.getElementById('temperatureRes');
    const feelsLikeRes = document.getElementById('feelsLikeRes');
    const windRes = document.getElementById('windRes');

    const apiKey = 'key';       

    cityInput.addEventListener('focus', function() {
        if (this.value === 'Введите город') {
            this.value = '';
        }
    });

    cityInput.addEventListener('blur', function() {
        if (this.value === '') {
            this.value = 'Введите город';
        }
    });

    searchButton.addEventListener('click', getWeather);

    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            getWeather();
        }
    });

    function getWeather() {
        const city = cityInput.value;
        if (city === '' || city === 'Введите город') {
            alert('Пожалуйста, введите название города');
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`)
            .then(response => response.json())
            .then(data => {
                temperatureRes.textContent = `${Math.round(data.main.temp)}°C`;
                feelsLikeRes.textContent = `${Math.round(data.main.feels_like)}°C`;
                windRes.textContent = `${data.wind.speed} м/с`;
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Не удалось получить данные о погоде. Пожалуйста, проверьте название города и попробуйте снова.');
            });
    }
});