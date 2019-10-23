import React,{ useEffect } from 'react';
import List from '../../component/list/list';
import {connect}from 'react-redux';
import {fetchOrders} from '../../store/actions/lists/lists';
import PaginationExample from '../../component/Pagination/Pagination';
import ErrorBoundry from '../../hoc/ErrorBoundary/ErrorBoundary';
class Lists extends React.Component{

    state ={
        posts:[],
         currentPage : 1,
         postsPerPage : 3,
         
    }
    componentDidMount () {
        this.props.onFetchOrders(this.props.token,this.props.userId)
        .then(response=> {
            console.log("lists");
            console.log(response);
            // this.setState({posts: response.slice(0, this.state.postsPerPage)});
            // this.setState({totalPages: Math.ceil(response.length/this.state.postsPerPage)});
        })     
    }

    addPostHandler = () => {
        this.props.history.push('/dashboard/posts/newPost');
    }

//      pageChange = (activePage) => {
//         const pageRequestObj = pageRequestObj = pageRequestObj;
//         const { perPage } = pageRequestObj;
//         pageRequestObj.page = activePage;
//         constformIndex = (activePage-1) ? ((activePage-1) * perPage) : 0
// ;
//         const tillIndex = activePage * perPage;
//         pageRequestObj.records = [...AllArticle].slice(fromIndex,tillIndex);
//         setPaginationData({...pageRequestObj});

//  }
   
//     pageChange= () => {
//         console.log("Pagination")
//     const indexOfLastPage = this.state.currentPage * this.state.postsPerPage;
//     const indexOfFirstPage = indexOfLastPage - this.state.postsPerPage;
//     const currentPosts = this.state.posts.slice(indexOfFirstPage,indexOfLastPage);
//     this.setState({posts:currentPosts})
// }
    render(){
      
        console.log("length");
            let posts;
            console.log(this.props.list.length);
            if(this.props.list.length != 0){
                posts =
                 this.props.list.map(l => (      //array to array of JSX
                    <List 
                     id={l.id} 
                     title={l.title}
                     description={l.description}
                    createdDate= {l.createdDate}
                    updatedDate={l.updatedDate}
                    
                     page={this.state.currentPosts}/>
                    
                ))
            }else{
                posts = <h1> No Data Found </h1>
            }
        
         return(
            <div>
                 <button onClick={this.addPostHandler}>+ Add </button><br/><br/>
                <ErrorBoundry>
                   
                {posts}
                </ErrorBoundry><br/>
                {/* <PaginationExample
                onPageChange={this.pageChange}
                currentpage ={this.state.currentPage} 
                postsPerPage ={this.state.postsPerPage}
                /> */}
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

