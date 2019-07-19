import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

const SButton = styled(Button)`
	* {
		border-top-right-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}
`;

export default (props) => {
	const { children, onClick, className } = props;
	return <SButton onClick={onClick} className={className}>{children}</SButton>;
};
