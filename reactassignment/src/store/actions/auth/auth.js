import Axios from 'axios';

export const auth = (email,password,isSignup) => {
    return dispatch => {
       
        const authData = {
            email:email,
            password:password,
            returnSecureToken : true
        };
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDE5LJUm9G9hWGmHSyYUM0cvq_Fk_agaAE'
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDE5LJUm9G9hWGmHSyYUM0cvq_Fk_agaAE'
        }
        Axios.post(url,authData)
            .then(response => {
                console.log(response);
                // const expirationDate = new Date(new Date() .getTime()+ response.data.expiresIn * 1000);
                // localStorage.setItem('token',response.data.idToken);
                // localStorage.setItem('expirationDate',expirationDate);
                // localStorage.setItem('userId',response.data.localId);
                // dispatch(authSuccess(response.data.idToken,response.data.localId));
                // dispatch(checkOutTimeout(response.data.expiresIn));

            })
            .catch(err=> {
                console.log(err);
               
            })
    }
}
