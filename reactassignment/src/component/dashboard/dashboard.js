import React ,{ Component } from 'react';
import { Route ,Link} from 'react-router-dom';
import Axios from '../../axios-orders';
import PostManipulate from '../../container/postManipulate/postManipulate';
import './dashboard.css';
import * as actions from '../../store/actions/auth/auth';
import { connect } from 'react-redux'; 
import AddPost from '../addPost/addPost';
// import authRed from '../../store/reducers/reducer';


class Dashboard extends React.Component{

    componentDidMount() {
        // this.props.onFetchOrders(this.token,this.userId);
        console.log("fteched data");
    }
    createNewPostHandler =() => {
        console.log("Create new post");
        Axios.get('/newPosts.json')
    
        .then(response => {
            
            if(response.localId){
                console.log("response of get...");
            console.log(response)
            }
           
        }).catch(error => {
            console.log(error)
        })
}

    logoutHandler =() => {
        console.log("logout");
    }
    render(){
        const userid=localStorage.getItem('userId');
        const token= localStorage.getItem('token');
        console.log("userId: ",userid);
        console.log("token: ",token);
        
        return(
           
            <div className="example">
            <h1> Dashboard</h1>
            <button className="button-icon" onClick={this.logoutHandler}> Logout</button>

            {/* for adding the data */}
            {/* <table border="5px" width="80%">
                <tr>
                    <td>giului</td>
                    <td>gik</td>
                </tr>
            </table> */}
         <Route
            path="/dashboard/add"
            component={() => <AddPost/>}
             component={PostManipulate}
            exact 
        />
        <Link to="/dashboard/add">
            <button onClick={this.createNewPostHandler}>Create Post</button></Link>
        <br/><br />

            </div> 
        )
    }
    // var edit = new FroalaEditor('#example')
}


const mapStateToProps =state=>{
    return{

        token: state.red.token,
        userId :state.red.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);