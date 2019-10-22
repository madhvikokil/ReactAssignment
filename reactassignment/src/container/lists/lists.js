import React,{ useEffect } from 'react';
import List from '../../component/list/list';
import {connect}from 'react-redux';
import {fetchOrders} from '../../store/actions/lists/lists';
import PaginationExample from '../../component/Pagination/Pagination';
class Lists extends React.Component{

    state ={
         currentPage : 1,
         postsPerPage : 4
    }
    componentDidMount () {
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    addPostHandler = () => {
        this.props.history.push('/dashboard/posts/newPost');
    }
   
    render(){
      
        // const indexOfLastPage = this.state.currentPage * this.state.postsPerPage;
        // const indexOfFirstPage = indexOfLastPage - this.state.postsPerPage;
        // const currentPosts = posts.slice(indexOfFirstPage,indexOfLastPage);

        let posts = this.props.list.map(l => (      //array to array of JSX
                    <List 
                     id={l.id} 
                     title={l.title}
                     description={l.description}
                    createdDate= {l.createdDate}
                    updatedDate={l.updatedDate}/>
                    // page={currentPosts}
                    
                ))
         return(
            <div>
                 <button onClick={this.addPostHandler}>+ Add </button><br/><br/>
                {posts}<br/>
                <PaginationExample/>
                <br/>
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

