import React from 'react';
import './list.css';
import Axios from '../../axios-orders';
// import Orders from '../../container/lists/lists';
import Lists from "../../container/lists/lists";


const List = (props) => {
    
    Axios.get('newPosts.json');
    const lists=[];
   
    console.log(props.title);
    console.log(props.description)
   
    return(
  
        <div className="box">
            <table border="1px solid black" width="95%">
                <tr>
                {/* <Lists /> */}
                    <h3>Title :  {props.title} </h3>
                    <h3>Description :  {props.description} </h3>
                   
                </tr>
            </table>
        
       
    </div>
    )
};



export default List;