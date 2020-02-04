import firebase from '../../../firebase/fbConfig';
import firestore from '../../../firebase/fbConfig';

  /**
   * create a user
   * Mail verification
   * save user database
   */
export function registerWithFirebase(model)
  {
      const {email, password,name,role} = model;
      return (dispatch) =>{
  
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((response) => {  
              if(response.user){  
                     firestore.firestore().collection('users').doc(response.user.uid).set({
                     displayName : name,
                     createdAt: new Date(),
                     emailVerified: response.user.emailVerified,
                     uid: response.user.uid,
                     email_user:email,
                     name,
                     role: role,
                   })
                 .then(()=>{
                  dispatch({
                      type: 'REGISTER_SUCCESS',
                  });
              })
                     
           }})         
          .then((error)=>{
              console.log('error type',error)
          })
  
             
      }
}