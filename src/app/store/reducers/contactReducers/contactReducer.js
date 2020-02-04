const initialState = {
    allContact:[],
    searchText: '',
    contactItem:{},
    todoDialog    : {
        type : 'new',
        props: {
            open: false
        }
    }
}

const contactReducer = (state = initialState, action) => {
    
    if (action.type === "Add_CONTACT"){
    }

    if (action.type === "GET_ALL_CONTACT_SUCCESS"){  
      console.log('action',action.payload)
        return{
          ...state,
          allContact:action.payload
        }
    }

    if(action.type === 'OPEN_REMOVE_CONTACT'){
          return {
              ...state,
              todoDialog: {
                  type : 'remove',
                  props: {
                      open: true
                  }
              }
          };
    }

    if(action.type==='CLOSE_REMOVE_CONTACT')
    {
        return {
            ...state,
            todoDialog: {
                type : 'remove',
                props: {
                    open: false
                }
            }
        };
    }

    if(action.type === 'OPEN_EDIT_CONTACT'){
        return {
            ...state,
            todoDialog: {
                type : 'edit',
                props: {
                    open: true
                }
            }
        };
    }

    if(action.type === 'CLOSE_EDIT_CONTACT'){
        return {
            ...state,
            todoDialog: {
                type : 'edit',
                props: {
                    open: false
                }
            }
        };
    }

    if(action.type === 'OPEN_NEW_CONTACT'){
        return {
            ...state,
            todoDialog: {
                type : 'new',
                props: {
                    open: true
                }
            }
        };
    }

    if(action.type === 'CLOSE_NEW_CONTACT'){
        return {
            ...state,
            todoDialog: {
                type : 'new',
                props: {
                    open: false
                }
            }
        };
    }
    
    if(action.type==='UPDATE_CONTACT'){
      console.log("UPDATED")
    }

    if(action.type ==='EDIT_CONTACT_ITEM')
    {
      console.log('from reducer',action.contact)
      return {
        ...state,
        contactItem: action.contact
      }
  }    


   return state
}
export default contactReducer;