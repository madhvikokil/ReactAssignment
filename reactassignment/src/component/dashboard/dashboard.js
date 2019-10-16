import React ,{ Component } from 'react';
import { Route ,Link} from 'react-router-dom';
import Axios from '../../axios-orders';
import PostManipulate from '../../container/postManipulate/postManipulate';
import './dashboard.css';
// import FroalaEditor from 'froala-editor'
//import classes from './editor.css';
// //<link href="../css/froala_style.min.css" rel="stylesheet" type="text/css" />

class Dashboard extends Component{
    createNewPostHandler =() => {
        console.log("Create new post");
        Axios.get('/data.json')
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })


    }

    logoutHandler =() => {
        console.log("logout");
    }
    render(){
        return(
            <div className="example">
            <h1> Dashboard is here....</h1>
            <button className="button-icon" onClick={this.logoutHandler}> Logout</button>

            {/* for adding the data */}
            <table border="2px">
                <tr>
                    <td>giului</td>
                    <td>gik</td>
                </tr>
            </table>
         <Route
            path="/dashboard/add"
            // render={(() => <h1> ADDING THE NEW POST</h1> )}
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
export default Dashboard;