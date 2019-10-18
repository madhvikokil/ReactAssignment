import React,{ useEffect } from 'react';
import List from '../../component/list/list';
import Axios from '../../axios-orders';
import {connect}from 'react-redux';
//import withErrorHandler from '../../hoc/withErrorHandler';
import {fetchOrders} from '../../store/actions/lists/lists';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Lists = props => {
   
   useEffect(() => {
    props.onFetchOrders(props.token,props.userId);
   },[])
      

    
        let list= props.list.map(l => (      //array to array of JSX
                    <List key={l.id} 
                     title={l.title}
                     description={l.description}/>
                ))
            
            
        
        return(
            <div>{
                props.list.map(l => (      //array to array of JSX
                    <List key={l.id} 
                     title={l.title}
                     description={l.description}/>
                ))
            }
{/*                 
                //    props.userData && props.userData.map(list => (      //array to array of JSX
                //         <List key={list.id} 
                //          title={list.title}
                //          description={list.description}
                //          />))
                // {orders}
                // {list} */}
                {/* {list} */}
            </div>
        );
    
}

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
export default connect(mapStateToProps,mapDispatchToProps)(Lists);
//export default Orders;

