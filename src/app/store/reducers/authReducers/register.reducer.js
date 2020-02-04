const initState = {
    authError: null,
    currentUser: {}
}
  
const register = (state = initState, action) => {
    switch(action.type){

      case 'SIGNUP_SUCCESS':
        console.log('signup success')
        return {
          ...state,
          currentUser: action.displayName,
          authError: null
        }
  
      case 'SIGNUP_ERROR':
        console.log('signup error')
        return {
          ...state,
          authError: action.err.message
        }

      default:
        return state
    }
};
  
export default register;