const initialState = {
    allInformations:[],
    searchText: '',
    informationItem:{},
    todoDialog    : {
        type : 'new',
        props: {
            open: false
        }
    }
}

const infoReducer = (state = initialState, action) => {
    
    if (action.type === "Add_INFORMATION"){
    }

    if (action.type === "GET_ALL_INFORMATIONS_SUCCESS"){  
      console.log('action',action.payload)
        return{
          ...state,
          allInformations:action.payload
        }
    }

    if(action.type === 'OPEN_REMOVE_INFORMATION'){
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

    if(action.type==='CLOSE_REMOVE_INFORMATION')
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

    if(action.type === 'OPEN_EDIT_INFORMATION'){
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

    if(action.type === 'CLOSE_EDIT_INFORMATION'){
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

    if(action.type === 'OPEN_NEW_INFORMATION'){
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

    if(action.type === 'CLOSE_NEW_INFORMATION'){
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
    
    if(action.type==='UPDATE_INFORMATION'){
      console.log("UPDATED")
    }

    if(action.type ==='EDIT_INFORMATION_ITEM')
    {
      console.log('from reducer',action.information)
      return {
        ...state,
        informationItem: action.information
      }
  }    


   return state
}
export default infoReducer;