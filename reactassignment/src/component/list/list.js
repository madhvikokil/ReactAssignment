import React from 'react';
import './list.css';
import Axios from '../../axios-orders';
import { Route , Link } from 'react-router-dom';
import AddPost from '../../component/addPost/addPost';



const List = (props) => {

   // Deleting the data from the firebase
   const deleteHandler = () => {
        console.log("Delete...");
        Axios.delete(`newPosts/${props.id}.json`)

    }

    const editHandler = () => {
        console.log("edit");
        console.log("title", props.title);
        console.log("description",props.description);
        console.log("id: ",props.id);
            
     }

    return(
        
        <div className="box">
            <table border="1px solid black" width="95%">
                <tr>
                {/* <Lists /> */}
                <button className="button-class" onClick={deleteHandler}> delete </button>
                <Route path="/addPost/" exact component={() => <AddPost/>}/>
                    <Link to={`/addPost/${props.id}`}>
                    
                    {/* <button >+ ADD </button></Link><br/><br/> */}
                <button className="button-class" onClick={editHandler} >  edit </button></Link>
                    <h3>Title :  {props.title} </h3>
                    <h3>Description :  {props.description} </h3>               
                    
                </tr>
            </table>
    </div>
      
    )
};



export default List;