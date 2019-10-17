import React,{ Component } from 'react';
import Input from '../../UI/Input/Input';
import classes from './AuthSignup.css'
import Axios from '../../axios-orders';
import Auth from '../../store/actions/auth/auth';
import { Redirect } from 'react-router-dom';

class AuthSignup extends Component {
state = {
    orderForm :{
        name : {    
            elementType :'input',
            elementConfig:{
                type:'text',
                placeholder:'first name'
            },
            value:'',
            validation:{
                required:true
            },
            vaild:false,
            touched:false
         },

        lname : {
                elementType :'input',
                elementConfig:{
                    type:'text',
                    placeholder:'last name'
                },
            value:'',
            validation:{
                required:true
            },
            vaild:false,
            touched:false

            },

        email : {
                elementType :'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your email'
                },
            value:'',
            validation:{
                required:true
            },
            vaild:false,
            touched:false

            },

        password : {
                elementType :'input',
                elementConfig:{
                    type:'password',
                    placeholder:'your password'
                },
            value:'',
            validation:{
                required:true
            },
            vaild:false,
            touched:false

            },
        },
    formIsValid:false
}

// // when the data is to be submitted
// submitHandler =(event) => {
//     console.log("To be submited")
//     event.preventDefault();
//         const formData = {};
        
//       console.log("this.state.orderForm");
//       console.log(this.state.orderForm);
//         for(let formElemenIdentifier in this.state.orderForm){
//             console.log("this.state.orderForm[formElemenIdentifier].value :");
//             console.log(this.state.orderForm[formElemenIdentifier].value)
//             formData[formElemenIdentifier] = this.state.orderForm[formElemenIdentifier].value;
        

//         }
//          Axios.post('/data.json',formData)
//         // Axios.post('/order.json?auth=' + token,formData)
        
//         .then(response => {
//             this.authTransfer(formData.email,formData.password);
//             console.log("response",response);
//             document.write("Successfully Signed up");
            
//             // Axios.get('www.facebook.com');
     
//         }) .catch(error => {
//             console.log("error");
//         })
       
// }

signUp = (event) =>{
    
    console.log("To be submited")
    event.preventDefault();
    const formData ={}
    for(let formElemenIdentifier in this.state.orderForm){
        console.log("this.state.orderForm[formElemenIdentifier].value :");
        console.log(this.state.orderForm[formElemenIdentifier].value)
        formData[formElemenIdentifier] = this.state.orderForm[formElemenIdentifier].value;
    }
    const authData= {
        email : formData.email,
        password : formData.password,
        returnSecureToken : true
    }
    Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQhsLsRX4QrkPtp7OQCA11_oTnxIZ8nZA',authData)
    .then(response=>{
        console.log("google apis response",response.data);
        return (response.data)
    }).then(response => {
        console.log("then 1", response);
        const userData = {
            email: authData,
            fname: formData.name,
            lname:formData.lname
        }
        console.log("userData",userData);
        Axios.put('/userData/'+response.localId+'.json',formData);
        // <Redirect to="/login" />
    }).catch(error=>{
        alert("error in signup plz check");
    })
}

// For Authentication the data is stored in Firebase
authTransfer = (email,password)  => {
    console.log("Store in Authentcation ");
    console.log("email:"+email," password: "+password);
        const authData= {
            email : email,
            password : password,
            returnSecureToken : true
        }
        Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQhsLsRX4QrkPtp7OQCA11_oTnxIZ8nZA',authData)
        .then(response => {
            console.log(response.data);
            console.log("authenticate new ");
        }) .catch(error => {
            console.log(error)
            console.log("failed");
        })
    }

// If the input is changed
inputChangedHandler = (event ,inputIdentifier) => {
    const updatedOrderForm = {
        ...this.state.orderForm 
    }
   const updatedFormElement = {
    ... updatedOrderForm[inputIdentifier]
   } ;
   updatedFormElement.value = event.target.value;
   updatedFormElement.touched = true;

   updatedOrderForm[inputIdentifier] = updatedFormElement;
   
   let formIsVaild = true;
   for(let inputIdentifier in updatedOrderForm){
       formIsVaild=updatedOrderForm[inputIdentifier].valid && formIsVaild;
   }
   console.log(formIsVaild);
   this.setState({orderForm:updatedOrderForm,formIsVaild:formIsVaild})
}


render() {
   
    const formElementArray =[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]


            })
        }
        let form =(
            <form onSubmit={this.orderHandler}>
               {formElementArray.map(formElement => (
                    <Input 
                    key={formElement.id}
                     elementType={formElement.config.elementType}
                     elementConfig={formElement.config.elementConfig}
                    // value={formElement.config.value}
                    invalid = {!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched} 
                    changed={(event) => {this.inputChangedHandler(event,formElement.id)}}/>
                ))}
               
                <br/>
                
                <button class="ui button" type="button" onClick={this.signUp}>Sign up </button>
                    {/* // disabled={!this.state.formIsVaild} */}
                   
                   
            </form>
             
        )
    return (
        <div className="signup">
            <h1> Enter Details...</h1>
            {form}
        </div>
    
    )
}
}

export default AuthSignup;