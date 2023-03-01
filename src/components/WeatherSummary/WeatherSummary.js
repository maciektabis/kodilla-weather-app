import styles from './WeatherSummary.module.scss';

const WeatherSummary = ({city, description, temp, icon}) => {
	console.log(icon);
	return (
		<section className={styles.weatherSummary}>
			<img
				alt={description}
				src={`${process.env.PUBLIC_URL}/images/weather-icons/${icon}.png`}
			/>
			<div className={styles.weatherInfo}>
				<h2>{city}</h2>
				<p>
					<strong>Temp:</strong> {temp.toFixed(1)}°C
				</p>
			</div>
		</section>
	);
};

export default WeatherSummary;
