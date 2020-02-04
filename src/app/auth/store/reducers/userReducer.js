const initialState = {
    emailVerified: false,
    email_user     : ' ',
    displayName: ' '
};

const user = function (state = initialState, action) {
switch ( action.type )
{
    case 'SET_USER_DATA':
    {
        return {
            ...initialState,
            ...action.payload
        };
    }
    case 'SET_USER_DATA_VERIF_MAIL':
    {
        console.log('reducer ',action.payload.emailVerified)
        return {
            ...initialState,
            emailVerified : action.payload.emailVerified
        };
    }
    case 'REMOVE_USER_DATA':
    {
        return {
            ...initialState
        };
    }
    case 'SIGNOUT_SUCCESS':
    {
        console.log('signout success');
        return {
            ...initialState
        }
    }
    default:
    {
        return state
    }
}
};

export default user;
