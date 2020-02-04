const initialState = {
  allMagasins:[],
    searchText: '',
    magasinItem:{},
    todoDialog    : {
      type : 'remove',
      props: {
          open: false
      },
      data : null
  },
}
const magasinReducer = (state = initialState, action) => {
    
    if (action.type === "Add_MAGASIN"){
    }

    if (action.type === "GET_ALL_MAGASINS_SUCCESS"){  
      console.log('action',action.payload)
        return{
          ...state,
          allMagasins:action.payload
        }
    }
    if(action.type === 'OPEN_DIALOG_MAGASIN'){
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

if(action.type==='CLOSE_DIALOG_MAGASIN')
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
    
    if(action.type==='UPDATE_MAGASIN'){
      console.log("UPDATED")
    }

    if(action.type ==='EDIT_MAGASIN_ITEM')
    {
      console.log('from reducer',action.magasin)
      return {
        ...state,
        magasinItem: action.magasin
      }
  }

   return state
}
export default magasinReducer;