const initialState = {
  allProduits:[],
    searchText: '',
    produitItem:{},
    todoDialog    : {
      type : 'remove',
      props: {
          open: false
      },
      data : null
  },
}
const produitReducer = (state = initialState, action) => {
    
    if (action.type === "Add_MAGASIN"){
    }

    if (action.type === "GET_ALL_PRODUITS_SUCCESS"){  
      console.log('action',action.payload)
        return{
          ...state,
          allProduits:action.payload
        }
    }
    if(action.type === 'OPEN_DIALOG_PRODUIT'){
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

  if(action.type==='CLOSE_DIALOG_PRODUIT')
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
    
    if(action.type==='UPDATE_PRODUIT'){
      console.log("UPDATED")
    }

    if(action.type ==='EDIT_PRODUIT_ITEM')
    {
      console.log('from reducer',action.produit)
      return {
        ...state,
        produitItem: action.produit
      }
  }

   return state
}
export default produitReducer;