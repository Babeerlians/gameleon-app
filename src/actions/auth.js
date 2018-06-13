export const EMAIL_VERIFIED = 'EMAIL_VERIFIED';

export const updateVerified = (verified) => (dispatch, getState) => {
    dispatch({
        type: EMAIL_VERIFIED,
        verified
    });
};