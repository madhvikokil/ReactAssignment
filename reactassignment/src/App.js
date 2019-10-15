import React from 'react';
import HeaderElement from './UI/headerElement/headerElement';
import './App.css';
import { BrowserRouter,Route } from 'react-router-dom';
import Signup from './UI/signup/signup';
import dashboard from './component/dashboard/dashboard';
//import Login from './UI/login/login';
import Auth from './container/Auth/Auth';
import AuthSignup from './container/AuthSignup/AuthSignup';
import Dashboard from './component/dashboard/dashboard';

function App() {
  return (
    <div className="App">
  
     <BrowserRouter> 
      <HeaderElement />
        <Route exact path = "/" render={(() =><h1> Home</h1> )} />
        <Route path = "/aboutus" render={(() =><h1> About Us</h1> )}/>
        <Route path = "/contactus" render={(() =><h1> Contact Us</h1> )}/>
        <Route path = "/dashboard" component={() => <Dashboard />}/>
        <Route exact path = "/signup" component={() => <AuthSignup/>} />
        <Route exact path = "/login" component={() => <Auth/>}/>

      </BrowserRouter>
    </div>
  );
}

export default App;
