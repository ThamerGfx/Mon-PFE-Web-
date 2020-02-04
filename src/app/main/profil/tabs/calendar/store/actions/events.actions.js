import firestore from '../../../../../../firebase/fbConfig';
import 'firebase/firestore'
import firebase from 'firebase/app' 
import store from 'app/store';
import * as Actions from 'app/store/actions';

export const GET_EVENTS = '[CALENDAR APP] GET EVENTS';
export const OPEN_NEW_EVENT_DIALOG = '[CALENDAR APP] OPEN NEW EVENT DIALOG';
export const CLOSE_NEW_EVENT_DIALOG = '[CALENDAR APP] CLOSE NEW EVENT DIALOG';
export const OPEN_EDIT_EVENT_DIALOG = '[CALENDAR APP] OPEN EDIT EVENT DIALOG';
export const CLOSE_EDIT_EVENT_DIALOG = '[CALENDAR APP] CLOSE EDIT EVENT DIALOG';
export const ADD_EVENT = '[CALENDAR APP] ADD EVENT';
export const UPDATE_EVENT = '[CALENDAR APP] UPDATE EVENT';
export const REMOVE_EVENT = '[CALENDAR APP] REMOVE EVENT';


export function getEvents()
{
    let allEvents=[]
  return(dispatch) =>{
    firestore.firestore().collection('events')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        const event={
          ...doc.data(),
          id: doc.id
        }
        allEvents.push(event) 
      })
      dispatch(getAllEventsSuccess(allEvents)); 
        return allEvents;
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
    })
}
}
export const getAllEventsSuccess = (allEvents) => ({
    type: 'GET_ALL_EVENTS_SUCCESS',
    payload: allEvents
  })


export function openNewEventDialog(event)
{
    return {
        type: 'OPEN_NEW_EVENT_DIALOG',
        event
    }
}

export function closeNewEventDialog()
{
    return {
        type: 'CLOSE_NEW_EVENT_DIALOG'
    }
}

export function openEditEventDialog(event)
{
    return {
        type: 'OPEN_EDIT_EVENT_DIALOG',
        event
    }
}

export function closeEditEventDialog()
{
    return {
        type: 'CLOSE_EDIT_EVENT_DIALOG'
    }
}


export function addEvent(event)
{
    return (dispatch) => {     

      firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
          console.log(firebaseUser.uid)
          firebase.firestore().collection("users").doc(firebaseUser.uid).get().then( doc => {
            console.log(doc.data())
            const { displayName } = doc.data()
            console.log(displayName)
            const currentUser = {
              uid: firebaseUser.uid,
              displayName
            }

        const idEvent = firestore.firestore().collection("events").doc().id; 
        firestore.firestore().collection("events").doc(idEvent)
        .set({ 
          ...event,  
          id: idEvent,
          authorName: currentUser.displayName, 
          authorId: currentUser.uid,
          createdAt: new Date()
        }) 
        .then(() => {
            dispatch({
                type: "Add_EVENT"
            })
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
      })
  })
}
      })
}
}

export function updateEvent(event)
{
        return(dispatch)=>{  

          firestore.firestore().collection('events').doc(event.id)
           .update(
             {
               ...event,
             }
            )
           .then(() =>{ 
             dispatch({
               type:'UPDATE_EVENT',  
             })  
            })
            .catch(function(error) {
              console.error("Error updating document: ", error);
          })
       }
}

export function removeEvent(eventId)
{
    return() =>{ 
        firestore.firestore().collection('events').doc(eventId)
        .delete()
        .then((error)=>{
          if(!error){
               store.dispatch(Actions.showMessage({message: "Cet event a été supprimé"}));
          }
       }) 
    } 
}
