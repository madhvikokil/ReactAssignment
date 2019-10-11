import React from 'react';
import HeaderElement from './UI/headerElement/headerElement';
import './App.css';
import { BrowserRouter,Route } from 'react-router-dom';
import Signup from './UI/signup/signup';
import Login from './UI/login/login';

function App() {
  return (
    <div className="App">
  
     <BrowserRouter> 
      <HeaderElement />
        <Route exact path = "/" render={(() =><h1> Home</h1> )} />
        <Route path = "/aboutus" render={(() =><h1> About Us</h1> )}/>
        <Route path = "/contactus" render={(() =><h1> Contact Us</h1> )}/>

        <Route exact path = "/signup" component={() => <Signup/>} />
        <Route exact path = "/login" component={() => <Login/>}/>

      </BrowserRouter>
    </div>
  );
}

export default App;
