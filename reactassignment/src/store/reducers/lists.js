import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
const initialState ={
    orders:[]
    
}

const purchaseBurgerSuccess = (state,action) => {
    const newOrder = updateObject(action.orderData,{id:action.orderId}) 
    return updateObject(state,{
       
        orders: state.orders.concat(newOrder)
    })
}

const fetchOrderSuccess = (state,action) => {
    return updateObject(state ,
        {orders:action.orders}) 
     }

const reducer = (state = initialState,action) =>{
    switch(action.type){
    
        case actionTypes.FETCH_ORDERS_SUCCESS:return fetchOrderSuccess(state,action)
        default: return state;
    }
}

export default reducer;