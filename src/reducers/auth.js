import {
    EMAIL_VERIFIED
} from '../actions/auth.js';

const auth = (state = {}, action) => {
    switch (action.type) {
        case EMAIL_VERIFIED:
            return {
                ...state,
                verified: action.verified
            };
        default:
            return state;
    }
}

export default auth;