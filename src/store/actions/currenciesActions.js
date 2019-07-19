export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SET_FIRST_CURRENT_CURRENCY = 'SET_FIRST_CURRENT_CURRENCY';
export const SET_SECOND_CURRENT_CURRENCY = 'SET_SECOND_CURRENT_CURRENCY';

export const getCurrencies = payload => ({
    type: GET_CURRENCIES,
    payload
});

export const setFromCurrentCurrency = payload => ({
    type: SET_FIRST_CURRENT_CURRENCY,
    payload
});

export const setToCurrentCurrency = payload => ({
    type: SET_SECOND_CURRENT_CURRENCY,
    payload
});
