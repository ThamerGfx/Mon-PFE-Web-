const initialState = {
    success: false,
    currentUser: {
            name:''
    },
    authError: null
};

const login =(state = initialState, action)=> {

    if(action.type==='LOGIN_SUCCESS'){
        console.log('success')
        return {
            ...state,
            success: true,
            authError: null
        };
    }
    
    if(action.type==='LOGIN_SUCCESS_GOOGLE'){
        console.log('succes google')
        return {
            ...state,
            success: true,
            authError: null
        };
    }

    if(action.type==='LOGIN_ERROR'){
        console.log('login fail')
        return {
            ...state,
            success: false,
            authError: 'Login failed'
        };
    }
    return state;
};

export default login;