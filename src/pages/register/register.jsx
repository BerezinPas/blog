import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthErrorForm, Button, H2, Input } from '../../components';
import * as yup from 'yup';
import { server } from '../../bff';
import { setUser } from '../../actions';
import { useState } from 'react';
import {
	loginSchema,
	passwordCheckSchema,
	passwordSchema,
} from '../../schemes';

const registerFormSchema = yup.object().shape({
	login: loginSchema,
	password: passwordSchema,
	passwordCheck: passwordCheckSchema,
});

const RegisterContainer = ({ className }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passwordCheck: '',
		},
		resolver: yupResolver(registerFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
			sessionStorage.setItem('userData', JSON.stringify(res));
			navigate('/');
		});
	};

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passwordCheck?.message;

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
				<Input
					type="password"
					placeholder="repeat password"
					{...register('passwordCheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthErrorForm>{errorMessage}</AuthErrorForm>}
				<Link to="/login">Авторизация</Link>
			</form>
		</div>
	);
};

export const Register = styled(RegisterContainer)`
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
