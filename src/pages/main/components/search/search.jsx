import styled from 'styled-components';
import { Icon, Input } from '../../../../components';

const SearchContainer = ({ className, onChange, value }) => {
	return (
		<div className={className}>
			<Input value={value} onChange={onChange} />
			<Icon id="fa-search" size="22px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	margin-top: 50px;
	position: relative;

	& > i {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
	}
`;
