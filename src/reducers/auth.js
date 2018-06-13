import {
    EMAIL_VERIFIED,
    LOGGED_UPDATE,
    USER_UPDATE
} from '../actions/auth.js';

const auth = (state = {}, action) => {
    switch (action.type) {
        case EMAIL_VERIFIED:
            return {
                ...state,
                verified: action.verified
            };
        case LOGGED_UPDATE:
            return {
                ...state,
                logged: action.logged
            };
        case USER_UPDATE:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
}

export default auth;