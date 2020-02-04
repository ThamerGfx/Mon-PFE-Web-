const initialState = {
    allClients:[],
    searchText: '',
    clientItem:{},
    todoDialog    : {
      type : 'remove',
      props: {
          open: false
      },
      data : null
  },
}
const clientReducer = (state = initialState, action) => {
    
    if (action.type === "Add_CLIENT"){
    }

    if (action.type === "GET_ALL_CLIENTS_SUCCESS"){  
      console.log('action',action.payload)
        return{
          ...state,
          allClients:action.payload
        }
    }
    if(action.type === 'OPEN_DIALOG_CLIENT'){
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

    if(action.type==='CLOSE_DIALOG_CLIENT')
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
    if(action.type==='UPDATE_CLIENT'){
      console.log("UPDATED")
    }

    if(action.type ==='EDIT_CLIENT_ITEM')
    {
      console.log('from reducer',action.client)
      return {
        ...state,
        clientItem: action.client
      }
  }

   return state
}
export default clientReducer;