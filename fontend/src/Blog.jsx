import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Error, Footer, Header, Modal } from './components';
import { Authorization, Main, Post, Register, Users } from './pages';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './actions';

const Appcolumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	/* width: 1000px; */
	background-color: #ebebeb;
	min-height: 100%;
	margin: 0 auto;
`;

const Page = styled.div`
	padding: 120px 0 50px;
	/* height: 100%; */
	flex-grow: 1;
	display: flex;
`;

function Blog() {
	const dispatch = useDispatch();

	// useLayoutEffect(() => {
	// 	console.log('KACHAEM');

	// // 	fetch('/api/posts')
	// // 		.then((res) => res.json())
	// // 		.then(console.log)
	// // 		.catch((e) => console.log(e.message));
	// // }, []);

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}
		const currentUserData = JSON.parse(currentUserDataJSON);
		dispatch(
			setUser({
				...currentUserData,
				id: Number(currentUserData.id),
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<Appcolumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Register />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route
						path="*"
						element={
							<Container>
								<Error errorMessage="Такая страница не существует" />
							</Container>
						}
					/>
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</Appcolumn>
	);
}

export default Blog;
