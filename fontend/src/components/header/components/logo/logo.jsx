import styled from 'styled-components';
import { Icon } from '../../..';
import { Link } from 'react-router-dom';

const LargeText = styled.div`
	font-size: 40px;
	font-weight: 500;
	line-height: 32px;
`;

const SmallText = styled.div`
	font-size: 18px;
	font-weight: 400;
`;

const LogoContainer = ({ className }) => {
	return (
		<Link to="/" className={className}>
			<Icon size="80px" margin="0 10px 0 0" id={' fa-code'} />
			<div>
				<LargeText>Блог</LargeText>
				<SmallText>веб-разработчика</SmallText>
			</div>
		</Link>
	);
};

export const Logo = styled(LogoContainer)`
	display: flex;
	align-items: center;
`;
