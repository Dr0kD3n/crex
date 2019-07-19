import { GET_CURRENCIES, SET_FIRST_CURRENT_CURRENCY, SET_SECOND_CURRENT_CURRENCY } from '../actions/currenciesActions';

const initialState = {
    currencyList: {},
    currentCurrency: {
        from: 'USD',
        to: 'RUB',
    },
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CURRENCIES: 
            return {
                ...state,
                currencyList: {...payload}
            };
        case SET_FIRST_CURRENT_CURRENCY: 
            return {
                ...state,
                currentCurrency: {...state.currentCurrency, from: payload}
            };
        case SET_SECOND_CURRENT_CURRENCY: 
            return {
                ...state,
                currentCurrency: {...state.currentCurrency, to: payload}
            };
        default:
            return state;
    }
};
