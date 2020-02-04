const initialState = {
    allFormations:[],
    searchText: '',
    formationItem:{},
    todoDialog    : {
      type : 'new',
      props: {
          open: false
      }
  },
}
const formationReducer = (state = initialState, action) => {
    
    if (action.type === "Add_FORMATION"){
    }

    if (action.type === "GET_ALL_FORMATIONS_SUCCESS"){  
      console.log('action',action.payload)
        return{
          ...state,
          allFormations:action.payload
        }
    }

    if(action.type === 'OPEN_REMOVE_FORMATION'){
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

    if(action.type==='CLOSE_REMOVE_FORMATION')
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

    if(action.type === 'OPEN_EDIT_FORMATION'){
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

    if(action.type === 'CLOSE_EDIT_FORMATION'){
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

    if(action.type === 'OPEN_NEW_FORMATION'){
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

    if(action.type === 'CLOSE_NEW_FORMATION'){
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
    
    if(action.type==='UPDATE_FORMATION'){
      console.log("UPDATED")
    }

    if(action.type ==='EDIT_FORMATION_ITEM')
    {
      console.log('from reducer',action.formation)
      return {
        ...state,
        formationItem: action.formation
      }
  }    


   return state
}
export default formationReducer;