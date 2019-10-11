import React,{Component} from  'react';

class Login extends Component{

    state ={ 
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
                    placeholder:'password'
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
     listHandler = () => {

    }
    render(){
        return(
        <form class="ui form">
            <div class="field">
                <label>Username</label>
                <input type="text" name="user-name" placeholder="Username"></input>
            </div>
            <div class="field">
                <label>Password</label>
                <input type="password" name="password" placeholder="Password"></input>
            </div>
            <button class="ui button" type="button" onClick={this.listHandler}>Login</button>
        </form>
        )
    }
}

export default Login;
