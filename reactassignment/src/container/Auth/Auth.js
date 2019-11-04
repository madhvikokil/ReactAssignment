import React,{Component} from  'react';
import Input from '../../UI/Input/Input';
import { connect }from 'react-redux';
import * as actions from '../../store/actions/auth/auth';
import { Link, withRouter } from 'react-router-dom';
import {Message,Segment} from 'semantic-ui-react';
import Validator from "validatorjs";


class Auth extends Component{

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
        isSignUp:true
    }
    
    validate = () => {
        const rules = {
          email: 'required|email',
          password: 'required|min:6|max:15',
          name: 'required'
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
            password: 'required|min:6|max:15',
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
          validationMessages.push(<Message key="2"
            size='mini'
            error
            content={this.state.errorMessage.email} />)
        }
        if (this.state.errorMessage.password) {
          validationMessages.push(<Message key="3"
            size='mini'
            error
            content={this.state.errorMessage.password} />)
        }
        return validationMessages;
      }
    submitHandler = (event) => {
     
     event.preventDefault();
    console.log("email: "+this.state.form.email);
    console.log("signup: "+this.state.isSignUp);
    console.log("password: "+this.state.form.password);
    
     this.props.onAuth(this.state.form.email,this.state.form.password,this.state.isSignUp)
    .then(() => {
        this.props.history.push('/dashboard/posts'); 
    }) 
  
    }

render() {
   

    let validationMessages = this.getValidationMessages();        
        let formData =(
    <form>

          {validationMessages.length ? <Segment style={{ display: "block" }} stacked>
            {[...validationMessages]}
          </Segment> : null}
               
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


const mapStateToProps = state => {
    return {
        isSignup: state.isSignup
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignUp) =>  dispatch(actions.authLogin(email,password,isSignUp)),
       
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Auth));

