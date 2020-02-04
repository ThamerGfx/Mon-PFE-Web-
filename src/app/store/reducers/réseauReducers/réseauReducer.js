const initialState = {
  allRéseaux:[],
    searchText: '',
    réseauItem:{},
    todoDialog    : {
      type : 'remove',
      props: {
          open: false
      },
      data : null
  },
}
const réseauReducer = (state = initialState, action) => {
    
    if (action.type === "Add_RESEAU"){
    }

    if (action.type === "GET_ALL_RESEAUX_SUCCESS"){  
      console.log('action',action.payload)
        return{
          ...state,
          allRéseaux:action.payload
        }
    }

    if(action.type === 'OPEN_DIALOG_RESEAU'){
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

  if(action.type==='CLOSE_DIALOG_RESEAU')
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
    
    if(action.type==='UPDATE_RESEAU'){
      console.log("UPDATED")
    }

    if(action.type ==='EDIT_RESEAU_ITEM')
    {
      console.log('from reducer',action.réseau)
      return {
        ...state,
        réseauItem: action.réseau
      }
  }

   return state
}
export default réseauReducer;