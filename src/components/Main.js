import React, { Component } from 'react';
import { sendRequest } from '../utils/request';
import { connect } from 'react-redux';
import { getCurrencies, setFromCurrentCurrency, setToCurrentCurrency } from '../store/actions/currenciesActions';
import { addAction } from '../store/actions/historyActions';
import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';
import Loader from '../common/Loader';
import { Checkbox } from 'semantic-ui-react';
import History from './History';

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100vh;
	padding: 39vh 0;
`;

const TopBar = styled.div`
	position: absolute;
	top: 10px;
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: flex-start;
`;

const TopBarLeft = styled.div`
`;
const TopBarRight = styled.div``;

const Result = styled.div`
	display: flex;
	width: 200px;
	flex-direction: row;
	justify-content: ${({single}) => single ? 'center' : 'space-between'};
	align-items: center;
	height: 40px;
`;

const CurrentRate = styled.div`
	margin-top: 10px;
`;
class Main extends Component {
	render() {
		const { 
			fromAmount,
			fromCurrency,
			toAmount,
			toCurrency,
			loaded,
			result,
			liveUpdate,
			exRate
		} = this.state;
		const { currencyList } = this.props;
		this.convert();
		return loaded ? (
			<>
				<TopBar>
					<TopBarLeft>
						<History />
					</TopBarLeft>
					<TopBarRight>
						<Checkbox
							label='Enable live update'
							defaultChecked={liveUpdate}
							onChange={this.toggleCheckbox}
							toggle
						/>
						<CurrentRate>
							current rate: {exRate} {toCurrency}
						</CurrentRate>
					</TopBarRight>
				</TopBar>
				<Wrapper>
					<Input
						className="fromAmount"
						value={fromAmount}
						onChange={this.handleChangeFrom}
						options={currencyList}
						selectValue={fromCurrency}
						onCurrencyChange={this.handleFromCurrencyChange}
					/>
					<Input
						className="toAmount"
						value={toAmount}
						onChange={this.handleChangeTo}
						options={currencyList}
						selectValue={toCurrency}
						onCurrencyChange={this.handleToCurrencyChange}
					/>
					<Result single={liveUpdate}>
						{!liveUpdate ? (
							<Button
								className="btn-convert"
								onClick={this.convertBtn}
							>convert</Button>
						) : null}
						<div className="result">{result} {toCurrency}</div>
					</Result>
				</Wrapper>
			</>
		) : <Loader />;
	}

	state = {
		loaded: false,
		fromAmount: 1,
		fromCurrency: '',
		toAmount: 0,
		toCurrency: '',
		result: '',
		exRate: null,
		liveUpdate: false
	}

	componentDidMount() {
		const { getCurrencies, currentCurrency } = this.props;
		const { from, to } = currentCurrency;
		sendRequest({
			url: 'https://api.exchangeratesapi.io/latest',
			method: 'get',
			success: (res) => {
				getCurrencies(res.data.rates);
				this.convert()
				this.setState({ fromCurrency: from, toCurrency: to });
			},
			fail: (err) => {
				console.log({ err });
			}
		});
	}

	handleChangeFrom = (e) => {
		const value = e.target.value;
		if(value > 0){
			this.setState({ fromAmount: value })			
		}else{
			alert('')
		} 
	}

	handleChangeTo = (e) => {}

	handleFromCurrencyChange = (e, data) => {
		const { setFromCurrentCurrency } = this.props;
		const { value } = data;
		this.setState({ fromCurrency: value })
		setFromCurrentCurrency(value);
	}

	handleToCurrencyChange = (e, data) => {
		const { setToCurrentCurrency } = this.props;
		const { value } = data;
		this.setState({ toCurrency: value })
		setToCurrentCurrency(value);
	}

	toggleCheckbox = () => {
		const { liveUpdate } = this.state;
		this.setState({ liveUpdate: !liveUpdate });
	}

	convertBtn = () => {
		this.convertBtn(true);
	}

	convert = (btn = false) => {
		const { currentCurrency, addActionToHistory } = this.props;
		const { result, fromAmount, toAmount, liveUpdate } = this.state;
		const { from, to } = currentCurrency;
		if(fromAmount && from && to) {
			sendRequest({
				url: `https://api.exchangeratesapi.io/latest?base=${from}&symbols=${from},${to}`,
				method: 'get',
				success: (res) => {
					const rate = res.data.rates[to];
					const newResult = (fromAmount*rate).toFixed(2);
					if(result !== newResult){
						this.setState({ loaded: true, toAmount: newResult, result: newResult, exRate: rate.toFixed(2) }, () => {
							(liveUpdate || btn) && addActionToHistory({
								fromAmount,
								toAmount: toAmount || 1,
								from,
								to,
								rate,
								result: newResult,
								date: new Date()
							});
						});
					}
				},
				fail: (err) => {
					console.log({ err });
				}
			})
		}
	}
}

const mapStateToProps = state => ({
	currencyList: state.currenciesReducer.currencyList,
	currentCurrency: state.currenciesReducer.currentCurrency,
});
const mapDispatchToProps = dispatch => ({
	getCurrencies: _ => dispatch(getCurrencies(_)),
	setFromCurrentCurrency: _ => dispatch(setFromCurrentCurrency(_)),
	setToCurrentCurrency: _ => dispatch(setToCurrentCurrency(_)),
	addActionToHistory: _ => dispatch(addAction(_))
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
