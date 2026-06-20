(function(){
	const API_KEY = window.OPENWEATHER_API_KEY || '';
	const select = document.getElementById('city-select');
	const form = document.getElementById('search-form');
	const input = document.getElementById('city-input');
	const resultCard = document.querySelector('#result .card');
	const placeholder = document.querySelector('#result .placeholder');
	const resCity = document.getElementById('res-city');
	const resTemp = document.getElementById('res-temp');
	const resDesc = document.getElementById('res-desc');
	const resFeels = document.getElementById('res-feels');
	const resHumidity = document.getElementById('res-humidity');
	const resWind = document.getElementById('res-wind');
	const resMain = document.getElementById('res-main');
	const resIcon = document.getElementById('res-icon');

	function showMessage(msg){
		placeholder.textContent = msg;
		placeholder.hidden = false;
		resultCard.hidden = true;
	}

	function showWeather(data){
		placeholder.hidden = true;
		resultCard.hidden = false;
		resCity.textContent = `${data.name}, ${data.sys && data.sys.country ? data.sys.country : ''}`;
		resTemp.textContent = `Temperature: ${Math.round(data.main.temp)} °C`;
		resDesc.textContent = data.weather && data.weather[0] ? data.weather[0].description : '';
		resFeels.textContent = `${Math.round(data.main.feels_like)} °C`;
		resHumidity.textContent = `${data.main.humidity}%`;
		resWind.textContent = `${Math.round(data.wind.speed)} m/s`;
		resMain.textContent = data.weather && data.weather[0] ? data.weather[0].main : '';

		if (data.weather && data.weather[0] && data.weather[0].icon) {
			const iconCode = data.weather[0].icon;
			resIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
			resIcon.alt = data.weather[0].description || 'Weather icon';
			resIcon.hidden = false;
		} else {
			resIcon.hidden = true;
		}
	}

	async function fetchWeatherByCity(city){
		if(!city) return showMessage('Please enter or select a city.');
		if(!API_KEY) return showMessage('No API key found. Create a local config.js with your API key (see config.example.js).');

		showMessage('Loading...');
		try{
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
			const res = await fetch(url);
			if(!res.ok){
				let errMsg = `${res.status} ${res.statusText}`;
				try{
					const errData = await res.json();
					if(errData && errData.message) errMsg += ` - ${errData.message}`;
				}catch(e){}
				if(res.status===404) return showMessage('City not found.');
				if(res.status===401) return showMessage('Unauthorized: API key invalid or inactive. Check your `config.js` and OpenWeatherMap account.');
				throw new Error(errMsg);
			}
			const data = await res.json();
			showWeather(data);
		}catch(err){
			console.error(err);
			showMessage('Unable to fetch weather. Check console for details.');
		}
	}

	// events
	select.addEventListener('change', e=>{
		const city = e.target.value;
		if(city) fetchWeatherByCity(city);
	});

	form.addEventListener('submit', e=>{
		e.preventDefault();
		const city = input.value.trim();
		fetchWeatherByCity(city);
	});

	// optional: allow enter in input to submit
	input.addEventListener('keydown', e=>{
		if(e.key==='Enter'){
			e.preventDefault();
			form.dispatchEvent(new Event('submit', {cancelable:true, bubbles:true}));
		}
	});

	// initial message
	showMessage('Select or search a city to see its temperature.');

})();

