import React ,{lazy,Suspense}from 'react';
import HeaderElement from './UI/headerElement/headerElement';
import './App.css';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Logout from './container/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth/auth';
import Auth from './container/Auth/Auth';
import AuthSignup from './container/AuthSignup/AuthSignup';
import NotFound from './hoc/notFound/notFound';
import Home from './container/home/home';
const Dashboard = lazy(() => import('./component/dashboard/dashboard'))
const Modal = lazy(() => import('./component/Modal/Modal'))
const ChartsShown = lazy(() => import('./component/Charts/ChartsShown'))

class App extends React.Component{
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

render(){
  let routes = (
     <Switch>
        <Route path = "/aboutus" render={(() =><h1> About Us</h1> )}/>
        <Route path = "/contactus" render={(() =><h1> Contact Us</h1> )}/>
        <Route path = "/signup" component={AuthSignup} />
        <Route path = "/login" component={Auth}/>
        <Route  path = "/" component={Home} />
        {/* <Route path = "/publicPosts/:id" component={PreviewData} /> */}
        <Route component={NotFound} />
    </Switch>
    
  );
  
  if(this.props.isAuthenticate){
    routes =(
      <Switch>
         
         <Route path = "/aboutus" exact render={(() =><h1> About Us</h1> )}/>
         <Route path = "/contactus" exact render={(() =><h1> Contact Us</h1> )}/>
         <Route path = "/dashboard" render={() =><Dashboard/>}/>
         <Route path = "/dashboard/preview" render={() =><Modal/>} />
         <Route path="/app/charts" render={() =><ChartsShown/>} />
         {/* <Route path = "/publicPosts/:id" component={PreviewData} /> */}
         <Route path = "/logout" component={Logout}/>
         <Route path = "/" component={Home} />
         <Route component={NotFound} />
        
    {/* <Route path = "/post" component={() => <PostContainer/>}/> */}
        
               
      </Switch>

     )
}

return(
    <BrowserRouter> 
      <div className="App">
      <HeaderElement />
      <Suspense fallback={<p>Loading...</p>}>
      {routes}
      </Suspense>
         
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