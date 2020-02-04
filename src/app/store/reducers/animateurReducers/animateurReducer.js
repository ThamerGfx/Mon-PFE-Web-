const initialState = {
    allAnimateurs:[],
    searchText: '',
    animateurItem:{},
    todoDialog    : {
      type : 'remove',
      props: {
          open: false
      },
      data : null
  },
}
const animateurReducer = (state = initialState, action) => {
    
    if (action.type === "Add_ANIMATEUR"){
    }

    if (action.type === "GET_ALL_ANIMATEURS_SUCCESS"){  
      console.log('action',action.payload)
        return{
          ...state,
          allAnimateurs:action.payload
        }
    }
    
    if(action.type === 'OPEN_DIALOG_ANIMATEUR'){
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

    if(action.type==='CLOSE_DIALOG_ANIMATEUR')
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

    if(action.type==='UPDATE_ANIMATEUR'){
      console.log("UPDATED")
    }

    if(action.type ==='EDIT_ANIMATEUR_ITEM')
    {
      console.log('from reducer',action.animateur)
      return {
        ...state,
        animateurItem: action.animateur
      }
  }

   return state
}
export default animateurReducer;