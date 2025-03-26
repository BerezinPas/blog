import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { server } from '../../bff';
import { useState } from 'react';
import styled from 'styled-components';
import { Button, H2, Input } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions';

const ErrorMessage = styled.div`
	border-radius: 5px;
	padding: 10px;
	background-color: #ff4949;
	color: #fff;
`;

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(
			/^\w+$/,
			'Неверно заполнен логин. Допускаются только буквы и цифры',
		)
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(16, 'Неверно заполнен логин. Максимум 16 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^\w+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символа')
		.max(32, 'Неверно заполнен пароль. Максимум 32 символов'),
});

const AuthorizationContainer = ({ className }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
			navigate('/');
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="login"
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="password"
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<Link to="./register">Регистрация</Link>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	& > form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 375px;
	}
`;
