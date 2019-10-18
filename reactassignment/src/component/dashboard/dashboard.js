import React ,{ Component } from 'react';
import { Route ,Link} from 'react-router-dom';
import Axios from '../../axios-orders';
import './dashboard.css';
import { connect } from 'react-redux'; 
import AddPost from '../addPost/addPost';
import List from '../list/list';
import Lists from '../../container/lists/lists';


class Dashboard extends React.Component{

    componentDidMount() {
     
        console.log("fteched data");
    }

    render(){
        
        const userid=localStorage.getItem('userId');
        const token= localStorage.getItem('token');
        console.log("userId: ",userid);
        console.log("token: ",token);

        return(
           <div className="example">
                <h1> Dashboard</h1>
                <Route path="/addPost" exact />
                    <Link to="/addPost">
                    <button >+ ADD </button></Link><br/><br/>
                    <List />
               <Lists />
               
            </div> 
        )
    }

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