const initialState = {
    allMessages:[],
    searchText: '',
    messageItem:{},
    todoDialog    : {
      type : 'send',
      props: {
          open: false
      },
      data : null
  },
}
const messageReducer = (state = initialState, action) => {
    
    if (action.type === "Add_MESSAGE"){
    }

    if (action.type === "GET_ALL_MESSAGES_SUCCESS"){  
      console.log('action',action.payload)
        return{
          ...state,
          allMessages:action.payload
        }
    }

    if(action.type === 'OPEN_DIALOG_MESSAGE')
    {
      return {
          ...state,
          todoDialog: {
              type : 'send',
              props: {
                  open: true
              },
              data : null
          }
      };
    }

    if(action.type==='CLOSE_DIALOG_MESSAGE')
    {
      return {
          ...state,
          todoDialog: {
              type : 'send',
              props: {
                  open: false
              },
              data : null
          }
      };
    }

    if(action.type ==='EDIT_MESSAGE_ITEM')
    {
      console.log('from reducer',action.message)
      return {
        ...state,
        messageItem: action.message
      }
    }

   return state
}
export default messageReducer;