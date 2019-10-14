import React,{Component} from  'react';
import Input from '../../UI/Input/Input';
import { connect }from 'react-redux';
import * as actions from '../../store/actions/auth/auth';

class Auth extends Component{

    state = { 
        controls: {
            email : {    
                elementType :'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email'
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
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:7
                },
                vaild:false,
                touched:false
             }
        },
        isSignup:true
    }

    submitHandler = (event) => {
        console.log(...this.state);
     console.log("hello");
     event.preventDefault();
     console.log("email: "+this.state.controls.email.value);
    console.log(this.state.controls.password.value);
    console.log(this.state.controls.isSignup.value)
     this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)

 }
   
    orderHandler = () => {
        console.log("order");
    }

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

    render(){
        const formElementArray =[];
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config:this.state.controls[key]
            })
        } 
        let form =(
            <form onSubmit={this.orderHandler}>
               {formElementArray.map(formElement => (
                    <Input 
                    placeholder={this.state.controls.email.placeholder}
                    key={formElement.id}
                     elementType={formElement.config.elementType}
                     elementConfig={formElement.config.elementConfig}
                    // value={formElement.config.value}
                    invalid = {!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched} 
                    changed={(event) => {this.inputChangedHandler(event,formElement.id)}}
                    />
                ))}
            <br/>
            <button class="ui button" type="button" onClick={this.submitHandler}>Login</button>
                </form>
        );
        return(

        <div> 
            <h1> Enter Details</h1><br/>
            {form}
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isSignup: state.isSignup
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignup) =>  dispatch(actions.auth(email,password,isSignup))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);

