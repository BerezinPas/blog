import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const Content = styled.div`
	padding: 120px 0;
`;

const H2 = styled.h2`
	text-align: center;
`;

const Header = () => <div>Header</div>;
const Footer = () => <div>Footer</div>;

function Blog() {
	return (
		<>
			<Header />
			<Content>
				<H2>content</H2>
				<Routes>
					<Route path="/" element={<div>Home</div>} />
					<Route path="/login" element={<div>login</div>} />
					<Route path="/auth" element={<div>auth</div>} />
					<Route path="/users" element={<div>users</div>} />
					<Route path="/post" element={<div>newpost</div>} />
					<Route path="/post/:postId" element={<div>Home</div>} />
					<Route path="/404" element={<div>error</div>} />
					<Route path="*" element={<div>error</div>} />
				</Routes>
			</Content>
			<Footer />
		</>
	);
}

export default Blog;
