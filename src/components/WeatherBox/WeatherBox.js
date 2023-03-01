import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import {useCallback, useState} from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = () => {
	const [weatherData, setWeatherData] = useState(null);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(false);

	const handleCityChange = useCallback((city) => {
		setPending(true);
		setError(false);

		console.log(city);
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a2e381cb1d816e945ef5d53b9e368b01
			&units=metric`
		).then((res) => {
			if (res.status === 200) {
				return res.json().then((data) => {
					const weatherData = {
						city: data.name,
						temp: data.main.temp,
						icon: data.weather[0].icon,
						description: data.weather[0].main,
					};
					setWeatherData(weatherData);
					setPending(false);
				});
			} else {
				setError(true);
			}
		});
	});
	return (
		<section>
			<PickCity action={handleCityChange} />
			{weatherData && !pending && (
				<WeatherSummary
					city={weatherData.city}
					temp={weatherData.temp}
					icon={weatherData.icon}
					description={weatherData.description}
				/>
			)}
			{pending && !error && <Loader />}
			{error && <ErrorBox />}
		</section>
	);
};

export default WeatherBox;
