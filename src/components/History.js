import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div `
	width: 100%;
`;

const History = (props) => {
	const { history, length = 10 } = props;
	const historyList = [...history].reverse().splice(0, length);
	return (
		<Wrapper>
			{historyList.map((e,i) => {
				const { from, to, fromAmount, toAmount, rate, date } = e;
				const timeDiff = (new Date().getTime() - new Date(date).getTime()) / 1000;
				const diff = timeDiff >= 60 ? `${timeDiff/60}min ago` : (timeDiff <= 1 ? `just now` : `${timeDiff}sec ago`);
				return (
					<div key={`${i}_${fromAmount}_${toAmount}_${date}`}>
						{fromAmount} {from} {' -> '}
						{toAmount} {to} {' '}
						rate: {rate.toFixed(2)} {' | '}
						{diff}
					</div>
				);	
			})}
		</Wrapper>
	);
};

const mapStateToProps = state => ({
	history: state.historyReducer.history,
});
export default connect(mapStateToProps)(History);
