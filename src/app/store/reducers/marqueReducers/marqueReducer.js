const initialState = {
  allMarques:[],
    searchText: '',
    marqueItem:{},
    todoDialog    : {
      type : 'remove',
      props: {
          open: false
      },
      data : null
  },
}
const marqueReducer = (state = initialState, action) => {
    
    if (action.type === "Add_MARQUE"){
    }

    if (action.type === "GET_ALL_MARQUES_SUCCESS"){  
      console.log('action',action.payload)
        return{
          ...state,
          allMarques:action.payload
        }
    }

    if(action.type === 'OPEN_DIALOG_MARQUE'){
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

    if(action.type==='CLOSE_DIALOG_MARQUE')
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
    
    if(action.type==='UPDATE_MARQUE'){
      console.log("UPDATED")
    }

    if(action.type ==='EDIT_MARQUE_ITEM')
    {
      console.log('from reducer',action.marque)
      return {
        ...state,
        marqueItem: action.marque
      }
  }

   return state
}
export default marqueReducer;