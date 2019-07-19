import { ADD_ACTION } from '../actions/historyActions';

const initialState = {
    history: [],
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_ACTION: 
            return {
                ...state,
                history: [...state.history, payload]
            };
        default:
            return state;
    }
};
