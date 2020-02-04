const initialState = {
    allAnimations:[],
    searchText: '',
    animationItem:{},
    todoDialog    : {
      type : 'remove',
      props: {
          open: false
      },
      data : null
  },
}
const myReducer = (state = initialState, action) => {
    
    if (action.type === "Add_ANIMATION"){
    }

    if (action.type === "GET_ALL_ANIMATIONS_SUCCESS"){  
      console.log('action',action.payload)
        return{
          ...state,
          allAnimations:action.payload
        }
    }

    if(action.type === 'OPEN_DIALOG_ANIMATION'){
          return {
              ...state,
              todoDialog: {
                  type : 'remove',
                  props: {
                      open: true
                  },
                  data : null
              }
          };
  }

  if(action.type==='CLOSE_DIALOG_ANIMATION')
  {
      return {
          ...state,
          todoDialog: {
              type : 'remove',
              props: {
                  open: false
              },
              data : null
          }
      };
  }
    
    if(action.type==='UPDATE_ANIMATION'){
      console.log("UPDATED")
    }

    if(action.type ==='EDIT_ANIMATION_ITEM')
    {
      console.log('from reducer',action.animation)
      return {
        ...state,
        animationItem: action.animation
      }
  }

   return state
}
export default myReducer;