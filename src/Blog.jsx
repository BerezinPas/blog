import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Footer, Header } from './components';
import { Authorization } from './pages';

const Appcolumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	/* width: 1000px; */
	background-color: #ebebeb;
	min-height: 100%;
	margin: 0 auto;
`;

const Content = styled.div`
	padding: 120px 0;
`;

const H2 = styled.h2`
	text-align: center;
`;

function Blog() {
	return (
		<Appcolumn>
			<Header />
			<Content>
				<H2>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
					quae ipsa libero deserunt optio veniam, facere corrupti amet ducimus
					culpa consectetur dolore eligendi eaque voluptatum error nam quaerat
					animi repellendus modi placeat quibusdam tempora possimus architecto.
					Suscipit soluta ea blanditiis labore accusamus, dolor doloremque quas
					iste at aperiam alias necessitatibus cum, itaque, minus officia ex?
					Debitis alias, quod ad qui non illo doloremque iste, sed ipsum cum
					consequuntur pariatur, cupiditate corporis impedit neque facere ex
					dolores asperiores? Sapiente id, cupiditate itaque natus dolores at,
					repudiandae reprehenderit ducimus quasi amet consectetur enim autem
					doloribus laborum sit ut facere vero ipsam eveniet.
				</H2>
				<Routes>
					<Route path="/" element={<div>Home</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<div>auth</div>} />
					<Route path="/users" element={<div>users</div>} />
					<Route path="/post" element={<div>newpost</div>} />
					<Route path="/post/:postId" element={<div>Home</div>} />
					<Route path="/404" element={<div>error</div>} />
					<Route path="*" element={<div>error</div>} />
				</Routes>
			</Content>
			<Footer />
		</Appcolumn>
	);
}

export default Blog;
