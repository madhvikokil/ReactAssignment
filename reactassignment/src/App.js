import React from 'react';
import HeaderElement from './UI/headerElement/headerElement';
import './App.css';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Logout from './container/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth/auth';
import Auth from './container/Auth/Auth';
import AuthSignup from './container/AuthSignup/AuthSignup';
import Dashboard from './component/dashboard/dashboard';


class App extends React.Component{
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

render(){
  let routes = (
     <Switch>
        <Route path = "/aboutus" render={(() =><h1> About Us</h1> )}/>
        <Route path = "/contactus" render={(() =><h1> Contact Us</h1> )}/>
        <Route path = "/signup" component={() => <AuthSignup/>} />
        <Route path = "/login" component={() => <Auth/>}/>
        {/* <Route path = "/dashboard" component={() => <Dashboard />}/> */}
        <Route exact path = "/" render={(() =><h1> Home</h1> )} />
    </Switch>
    
  );
  
  if(this.props.isAuthenticate){
    routes =(
      <Switch>
         <Route exact path = "/" render={(() =><h1> Home</h1> )} />
         <Route path = "/aboutus" render={(() =><h1> About Us</h1> )}/>
        <Route path = "/contactus" render={(() =><h1> Contact Us</h1> )}/>
        <Route path = "/dashboard" component={() => <Dashboard />}/>
        <Route path = "/signup" component={() => <AuthSignup/>} />
        
        <Route path = "/login" component={() => <Auth/>}/>
        <Route path = "/logout" component={() => <Logout/>} />
               
        </Switch>

// {/* <Route exact path="/" component={BurgerBuilder} />
// <Route  path="/checkout" component={Checkout} />
// <Route  path="/orders" component={Orders} />
// <Route  path="/auth" component={Auth} />

// <Route  path="/logout" component={Logout} />
// <Redirect to ="/" /> */}
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
}



const mapStateToProps = state => {
  return {
    isAuthenticate :state.red.token !==null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup : () =>dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)