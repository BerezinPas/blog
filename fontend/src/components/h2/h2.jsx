import styled from 'styled-components';
import PropTypes from 'prop-types';
const H2Container = ({ className, children }) => (
	<h2 className={className}>{children}</h2>
);

export const H2 = styled(H2Container)`
	margin: 30px 0;
	font-size: 26px;
	text-align: center;
`;

H2.propTypes = {
	children: PropTypes.node,
};
