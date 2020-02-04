const initialState = {
    entities   : [],
    eventDialog: {
        type : 'new',
        props: {
            open: false
        },
        data : null
    }
};

const eventsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case 'GET_ALL_EVENTS_SUCCESS':
        {
            const entities = action.payload.map((event) => (
                {
                    ...event,
                    start: new Date(event.start),
                    end  : new Date(event.end)
                }
            ));

            return {
                ...state,
                entities
            };
        }
        case 'OPEN_NEW_EVENT_DIALOG':
        {
            return {
                ...state,
                eventDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : {
                        ...action.data
                    }
                }
            };
        }
        case 'CLOSE_NEW_EVENT_DIALOG':
        {
            return {
                ...state,
                eventDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case 'OPEN_EDIT_EVENT_DIALOG':
        {
            return {
                ...state,
                eventDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : {
                        ...action.event,
                        start: new Date(action.event.start),
                        end  : new Date(action.event.end)
                    }
                }
            };
        }
        case 'CLOSE_EDIT_EVENT_DIALOG':
        {
            return {
                ...state,
                eventDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        default:
        {
            return state;
        }
    }
};

export default eventsReducer;