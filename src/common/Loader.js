import React from 'react';
import styled from 'styled-components';
import { Dimmer, Loader } from 'semantic-ui-react';

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	${({style}) => style};
`;

export default ({style}) => (
	<Wrapper style={style}>
  		<Dimmer active>
        	<Loader size='massive'>Loading</Loader>
      	</Dimmer>
	</Wrapper>
);
