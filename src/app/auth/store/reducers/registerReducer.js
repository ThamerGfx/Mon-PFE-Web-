const initialState = {
    success: false,
    error  : {
        username: null,
        password: null
    },
    toCompletFormulaire: false,
    userRegisterUid:'',
    authError : null
};

const register = function (state = initialState, action) {
    switch ( action.type )
    {
        case 'REGISTER_SUCCESS':
        {
            console.log('register success')
            return {
                ...state,
                authError : null,
                success : true
            };
        }
        case 'REGISTER_ERROR':
        {
            console.log('register error')
            return {
                ...state,
                authError  : false
            };
        }
        default:
        {
            return state
        }
    }
};

export default register;