import React,{ Component } from 'react';
import Input from '../../UI/Input/Input';
import classes from './AuthSignup.css'
import Axios from '../../axios-orders';
import {Message,Segment} from 'semantic-ui-react';
import Auth from '../../store/actions/auth/auth';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/auth/auth';

import Validator from "validatorjs";
import { connect } from 'react-redux';


class AuthSignup extends Component {
// state = {
//     orderForm :{
//         name : {    
//             elementType :'input',
//             elementConfig:{
//                 type:'text',
//                 placeholder:'first name'
//             },
//             value:'',
//             validation:{
//                 required:true
//             },
//             vaild:false,
//             touched:false
//          },

//         lname : {
//                 elementType :'input',
//                 elementConfig:{
//                     type:'text',
//                     placeholder:'last name'
//                 },
//             value:'',
//             validation:{
//                 required:true
//             },
//             vaild:false,
//             touched:false

//             },

//         email : {
//                 elementType :'input',
//                 elementConfig:{
//                     type:'email',
//                     placeholder:'your email'
//                 },
//             value:'',
//             validation:{
//                 required:true
//             },
//             vaild:false,
//             touched:false

//             },

//         password : {
//                 elementType :'input',
//                 elementConfig:{
//                     type:'password',
//                     placeholder:'your password'
//                 },
//             value:'',
//             validation:{
//                 required:true
//             },
//             vaild:false,
//             touched:false

//             },
//         },
//     formIsValid:false
// }

state ={
    form: {
        email:'',
        password:'',
        name:''
    },
    errorMessage: {
        email:'',
        password:''
    },
    isSignUp:false
}

submitHandler = event => {
    event.preventDefault();
    if(!this.validate()) {
        console.log("here");
        this.props.onAuth(this.state.form.name, this.state.form.email, this.state.form.password, this.state.isSignUp)
        .then(() => {
            this.props.history.push('/login')
        })
    }

}

validate = () => {
    const rules = {
      email: 'required|email',
      password: 'required|min:6|max:15',
      name: 'required|min:6|max:35'
    };

    let validation = new Validator(this.state.form, rules);
    let isError = validation.fails();
    this.setState({ errorMessage: validation.errors.errors });
    return isError;
}

   
 
changeHandler = (e) => {
    let form = { ...this.state.form }
    //console.log(e.target.name);
    form[e.target.name] = e.target.value;
    //console.log(e.target.value);
    this.setState({ form });
    const rules = {
        email: 'required|email',
        password: 'required|min:4|max:15',
        name: 'required'
      };
  
      let validation = new Validator(this.state.form, rules);
      let isError = validation.fails();
      this.setState({ errorMessage: validation.errors.errors });
      return isError;
  }

  getValidationMessages = () => {
    let validationMessages = [];
    if (this.state.errorMessage.email) {
      validationMessages.push(<Message key="1"
        size='mini'
        error
        content={this.state.errorMessage.email} />)
    }
    if (this.state.errorMessage.password) {
      validationMessages.push(<Message key="2"
        size='mini'
        error
        content={this.state.errorMessage.password} />)
    }
    if (this.state.errorMessage.name) {
      validationMessages.push(<Message key="3"
        size='mini'
        error
        content={this.state.errorMessage.name} />)
    }
    return validationMessages;
  }


// signUp = (event) =>{
    
//     console.log("To be submited")
//     console.log(this.state.form);
//     event.preventDefault();
//     const formData ={}
//     for(let formElemenIdentifier in this.state.orderForm){
//         console.log("this.state.orderForm[formElemenIdentifier].value :");
//         console.log(this.state.orderForm[formElemenIdentifier].value)
//         formData[formElemenIdentifier] = this.state.orderForm[formElemenIdentifier].value;
//     }
//     const authData= {
//         email : formData.email,
//         password : formData.password,
//         returnSecureToken : true
//     }
//     Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQhsLsRX4QrkPtp7OQCA11_oTnxIZ8nZA',authData)
//     .then(response=>{
//         console.log("google apis response",response.data);
//         return (response.data)
//     }).then(response => {
//         console.log("then 1", response);
//         const userData = {
//             email: authData,
//             fname: formData.name,
//             lname:formData.lname
//         }
//         console.log("userData",userData);
//         console.log("formData :",formData);
//         Axios.put('/userData/'+response.localId+'.json',formData);
//         alert("Signed up Successfully");
//         this.props.history.push('/login');
      
//     }).catch(error=>{
//          alert("error in signup plz check");
//     })
// }

// For Authentication the data is stored in Firebase
// authTransfer = (email,password)  => {
//     console.log("Store in Authentcation ");
//     console.log("email:"+email," password: "+password);
//         const authData= {
//             email : email,
//             password : password,
//             returnSecureToken : true
//         }
//         Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQhsLsRX4QrkPtp7OQCA11_oTnxIZ8nZA',authData)
//         .then(response => {
//             console.log(response.data);
//             console.log("authenticate new ");
//         }) .catch(error => {
//             console.log(error)
//             console.log("failed");
//         })
//     }

// If the input is changed
// inputChangedHandler = (event ,inputIdentifier) => {
//     const updatedOrderForm = {
//         ...this.state.orderForm 
//     }
//    const updatedFormElement = {
//     ... updatedOrderForm[inputIdentifier]
//    } ;
//    updatedFormElement.value = event.target.value;
//    updatedFormElement.touched = true;

//    updatedOrderForm[inputIdentifier] = updatedFormElement;
   
//    let formIsVaild = true;
//    for(let inputIdentifier in updatedOrderForm){
//        formIsVaild=updatedOrderForm[inputIdentifier].valid && formIsVaild;
//    }
//    console.log(formIsVaild);
//    this.setState({orderForm:updatedOrderForm,formIsVaild:formIsVaild})
// }


render() {
   

    let validationMessages = this.getValidationMessages();
    const formElementArray =[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]


            })
        }
        // let form =(
        //     <form onSubmit={this.orderHandler}>
        //        {formElementArray.map(formElement => (
        //             <Input 
        //             key={formElement.id}
        //              elementType={formElement.config.elementType}
        //              elementConfig={formElement.config.elementConfig}
        //             // value={formElement.config.value}
        //             invalid = {!formElement.config.valid}
        //             shouldValidate={formElement.config.validation}
        //             touched={formElement.config.touched} 
        //             changed={(event) => {this.inputChangedHandler(event,formElement.id)}}/>
        //         ))}
        //        <br/>
        //         <button class="ui button" type="button" onClick={this.signUp}>Sign up </button>
        //     </form>
             
        // )
        let formData =(

            <form>

          {validationMessages.length ? <Segment style={{ display: "block" }} stacked>
            {[...validationMessages]}
          </Segment> : null}
                <input type="text" placeholder="name" name="name" onChange={this.changeHandler}></input><br/>
                <input type="text" placeholder="Email" name="email" onChange={this.changeHandler}></input><br />
                <input type="password" placeholder="Password " name="password" onChange={this.changeHandler}></input><br/><br/>

                <button onClick={this.submitHandler}>Submit</button>
            </form>
        )
    return (
        <div className="signup">
            <h1> Enter Details...</h1>
            {formData}
        </div>
    
    )
}
}



const mapDispatchToProps =(dispatch) => {
    return{
        onAuth: (name, email, password, isSignUp) => dispatch(actions.auth(name, email, password, isSignUp))

    };
}
 
export default connect(null,mapDispatchToProps)(AuthSignup);