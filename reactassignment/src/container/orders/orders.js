import React,{ useEffect } from 'react';
import Order from '../../components/Order/Order';
import Axios from '../../axios-orders';
import {connect }from 'react-redux';
//import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders = props => {
   
   useEffect(() => {
    props.onFetchOrders(props.token,props.userId);
   },[])
      
   
        if(!props.loading) {
            orders= props.orders.map(order => (      //array to array of JSX
                    <Order key={order.id} 
                     text={order.text}
                     description={order.description}/>
                ))
            }
            
        
        return(
            <div>
               {orders}
            </div>
        );
    
}

const mapStateToProps =state=>{
    return{
        // orders:state.order.orders,
        // loading:state.order.loading,
        token: state.red.token,
        userId :state.red.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,Axios));
//export default Orders;