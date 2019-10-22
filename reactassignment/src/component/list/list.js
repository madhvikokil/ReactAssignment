import React from 'react';
import './list.css';
import Axios from '../../axios-orders';
import {fetchOrders} from '../../store/actions/lists/lists';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

const List = (props) => {

   // Deleting the data from the firebase
   const deleteHandler = () => {
        console.log("Delete...");
        Axios.delete(`newPosts/${props.id}.json`)
            .then(response => {
            props.onFetchOrders(props.token,props.userId);

        })
    }

    const editHandler = () => {
        console.log("edit");
        console.log("title", props.title);
        console.log("description",props.description);
        console.log("id: ",props.id);
        props.history.push(`/dashboard/posts/${props.id}`);
    }

     const previewHandler = () => {
         console.log("preview");
         props.history.push(`/dashboard/preview/${props.id}`);
         
        
    }

    return(
        
        <div className="box">
            
            <table border="1px solid black" width="95%">
                <tr>
                    <button className="button-class" onClick={previewHandler} > preview </button>
                    <button className="button-class" onClick={deleteHandler}> delete </button>
                    <button className="button-class" onClick={editHandler} >  edit </button>
                        <h3>Title :  {props.title} </h3>
                        <h3>Description :  {props.description} </h3>               
                        <h3>Created Date : {props.createdDate}</h3>
                        <h3>Updated Date : {props.updatedDate}</h3>
                </tr>
            </table>
           
        </div>
        
      
    )
};

const mapStateToProps =state=>{
    return{
     
        token: state.red.token,
        userId :state.red.userId,
        list: state.ord.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(fetchOrders(token,userId))
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(List));
