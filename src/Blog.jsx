import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Footer, Header, Modal } from './components';
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
	padding: 120px 0;
`;

function Blog() {
	const dispatch = useDispatch();

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
					<Route path="/404" element={<div>error</div>} />
					<Route path="*" element={<div>error*****</div>} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</Appcolumn>
	);
}

export default Blog;
