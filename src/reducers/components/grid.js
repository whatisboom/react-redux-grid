import { fromJS } from 'immutable';

const initialState = fromJS({
    gridState: fromJS.Map
});

export default function grid(state = initialState, action) {
    switch (action.type) {

    default:

        return state;
    }
}