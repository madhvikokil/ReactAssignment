import * as actionTypes from '../actionTypes';
import Axios from '../../../axios-orders';

export const fetchOrdersSuccess = (orders) => {
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrders = (token,userId) => {
    return dispatch => {
        console.log("fetchOrders...");
        console.log(token);
        console.log(userId);
        // dispatch(fetchOrdersStart())
        const queryParams = '?auth=' + token +'&orderBy="userId"&equalTo="' +userId + '"';
        Axios.get('./newPosts.json?' + queryParams)
            .then(response =>{
                console.log("fetched order data");
                console.log(response);
               const fetchedOrders=[];
               for(let key in response.data) {
                   fetchedOrders.push({
                       ...response.data[key],
                       id:key
                   });
               }
               dispatch(fetchOrdersSuccess(fetchedOrders));
                 //this.setState({orders:fetchedOrders})
            })
            .catch(error => {
                // dispatch(fetchOrdersFail(error))
                console.log(error);
;            });
    }
}