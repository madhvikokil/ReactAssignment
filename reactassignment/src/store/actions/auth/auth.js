import Axios from 'axios';

import * as actionTypes from '../actionTypes';
import { Route } from 'react-router-dom';

export const authStart =() => {
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess =(token,userId) => {
    
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
        
    }
}

export const authFail =(error) => {
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

// export const checkOutTimeout =(expiration) => {
//     return dispatch=>{
//          setTimeout(() => {
//             dispatch(logout());
//          },expiration * 1000)
//     }
// }
export const auth =(email,password,isSignup) => {
    return dispatch => {
       
        const authData = {
            email:email,
            password:password,
            returnSecureToken : true
        };
        console.log("Auth.js");

        let url;
        //let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDE5LJUm9G9hWGmHSyYUM0cvq_Fk_agaAE'
        if(isSignup){
           url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDE5LJUm9G9hWGmHSyYUM0cvq_Fk_agaAE'
        }
        Axios.post(url,authData)
            .then(response => {
                console.log(response);
                console.log("Successfully Logged...");
              
               
                const expirationDate = new Date(new Date() .getTime()+ response.data.expiresIn * 1000);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId',response.data.localId);
                dispatch(authSuccess(response.data.idToken,response.data.localId));
                //dispatch(checkOutTimeout(response.data.expiresIn));

            })
            .catch(err=> {
                console.log(err);
               
            })
    }
}
