import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Main from './components/Main';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	background: grey;
	overflow: hidden;
`;

function App() {
  return (
  	<Wrapper>
	    <Provider store={store}>
	      <Main />
	    </Provider>
    </Wrapper>
  );
}

export default App;
