import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import {useCallback, useState} from 'react';
const WeatherBox = (props) => {
	const [weatherData, setWeatherData] = useState(null);

	const handleCityChange = useCallback((city) => {
		console.log(city);
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a2e381cb1d816e945ef5d53b9e368b01
			&units=metric`
		)
			.then((res) => res.json())
			.then((data) => {
				const weatherData = {
					city: data.name,
					temp: data.main.temp,
					icon: data.weather[0].icon,
					description: data.weather[0].main,
				};
				setWeatherData(weatherData);
			});
	});
	return (
		<section>
			<PickCity action={handleCityChange} />
			{weatherData && (
				<WeatherSummary
					city={weatherData.city}
					temp={weatherData.temp}
					icon={weatherData.icon}
					description={weatherData.description}
				/>
			)}
			<Loader />
		</section>
	);
};

export default WeatherBox;
