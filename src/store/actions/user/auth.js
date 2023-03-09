import { auth as firebaseAuth } from 'firebase';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const logIn = (email, password) => {
    return async dispatch => {
        try {
            const response = await firebaseAuth().signInWithEmailAndPassword(email, password);
            console.log("firebase", response);
            dispatch({type: LOGIN, userId: response.user.uid});
        } catch (error){
            throw new Error(error);
        }
    }
}

export const logOut = () => {
    return async dispatch => {
        await firebaseAuth().signOut();
        dispatch({
            type: LOGOUT
        })
    }
}