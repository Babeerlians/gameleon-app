export const EMAIL_VERIFIED = 'EMAIL_VERIFIED';
export const LOGGED_UPDATE = 'LOGGED_UPDATE';
export const USER_UPDATE = 'USER_UPDATE';

export const updateVerified = (verified) => (dispatch, getState) => {
    dispatch({
        type: EMAIL_VERIFIED,
        verified
    });
};

export const updateLogin = (logged) => (dispatch, getState) => {
    dispatch({
        type: LOGGED_UPDATE,
        logged
    });
};

export const updateUserData = (user) => (dispatch, getState) => {
    dispatch({
        type: USER_UPDATE,
        user
    });
};