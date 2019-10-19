import React,{ useEffect } from 'react';
import List from '../../component/list/list';
import Axios from '../../axios-orders';
import {connect}from 'react-redux';
//import withErrorHandler from '../../hoc/withErrorHandler';
import {fetchOrders} from '../../store/actions/lists/lists';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Lists extends React.Component{
    componentDidMount () {
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }
   
    render(){
      
        let posts = this.props.list.map(l => (      //array to array of JSX
                    <List 
                     id={l.id} 
                     title={l.title}
                     description={l.description}/>
                ))
         return(
            <div>
                {posts}
            </div>
        )
    }
      
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

