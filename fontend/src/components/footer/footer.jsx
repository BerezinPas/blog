import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../container/container';

const FooterWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const FooterContainer = ({ className }) => {
	const [weatherData, setWeatherData] = useState({
		temp: 0,
		city: 'Novosibirsk',
		desc: '',
	});

	const URL =
		'https://api.openweathermap.org/data/2.5/weather?q=Novosibirsk&lang=ru&units=metric&appid=80acc3bf2cd9f5308fe750f5685e166f';
	useEffect(() => {
		fetch(URL)
			.then((res) => res.json())
			.then(({ main, name, weather }) => {
				setWeatherData({
					temp: Math.round(main.temp),
					city: name,
					desc: weather[0].description,
				});
			});
	}, []);

	return (
		<footer className={className}>
			<Container>
				<FooterWrapper>
					<div>
						<div>Блог веб-разработчика</div>
						<div>web@developer.ru</div>
					</div>
					<div>
						{weatherData.city}{' '}
						{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
						<br />
						{weatherData.temp} градусов, {weatherData.desc}
					</div>
				</FooterWrapper>
			</Container>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	align-items: center;
	height: 90px;
	background-color: rgba(35, 47, 56, 0.6);
`;
