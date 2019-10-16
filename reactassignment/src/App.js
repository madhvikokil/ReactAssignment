import React from 'react';
import HeaderElement from './UI/headerElement/headerElement';
import './App.css';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import Signup from './UI/signup/signup';
import dashboard from './component/dashboard/dashboard';
//import Login from './UI/login/login';
import Auth from './container/Auth/Auth';
import AuthSignup from './container/AuthSignup/AuthSignup';
import Dashboard from './component/dashboard/dashboard';

const App = (props) => {
 
  let routes = (
  
    
    <Switch>
        <Route path = "/aboutus" render={(() =><h1> About Us</h1> )}/>
        <Route path = "/contactus" render={(() =><h1> Contact Us</h1> )}/>
        <Route path = "/signup" component={() => <AuthSignup/>} />
        <Route path = "/login" component={() => <Auth/>}/>
        <Route path = "/dashboard" component={() => <Dashboard />}/>
        <Route path = "/" render={(() =><h1> Home</h1> )} />
    </Switch>
    
  );
  
  if(props.isAuthenticate){
    routes =(
      <Switch>
    
      
  {/* //       {/* <Route exact path = "/" render={(() =><h1> Home</h1> )} />
  //       <Route path = "/aboutus" render={(() =><h1> About Us</h1> )}/>
  //       <Route path = "/contactus" render={(() =><h1> Contact Us</h1> )}/> */} */}
          {/* <Route path = "/dashboard" component={() => <Dashboard />}/> */}
  {/* //         <Route exact path = "/signup" component={() => <AuthSignup/>} />
  //         <Route exact path = "/login" component={() => <Auth/>}/> */}
        </Switch>
     )
}
   
  
  return(
    <BrowserRouter> 
     <div className="App">
     <HeaderElement />
    {routes}
    </div>
    </BrowserRouter>
  )
}


// const mapStateToProps = state => {
//   return {
//     isAuthenticate :state.auth.token !==null
//   }
// }

export default App;
