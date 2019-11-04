import React from 'react';
import {connect}from 'react-redux';
import {fetchOrders} from '../../store/actions/lists/lists';
import ErrorBoundry from '../../hoc/ErrorBoundary/ErrorBoundary';
import { Pagination, Button, Table,Menu} from 'semantic-ui-react';
import Axios from '../../axios-orders'
class Lists extends React.Component{

    state ={
        posts:[],
        currentPage : 1,
        postsPerPage : 10,
        fullData:[]
         
         
    }
    componentDidMount = async()=> {
   
        const email = localStorage.getItem('email');
        if( email == 'admin@gmail.com'){
            let response = await Axios.get('/newPosts.json')
                       
                console.log(response);
                console.log("userId data...");
                
                 const fetchedOrders=[];
                 for(let key in response.data) {
                     fetchedOrders.push({
                         ...response.data[key],
                         id:key
                     });
                 }
                 console.log("fetched data: ");
                 console.log(fetchedOrders);
              //  this.setState({posts:fetchedOrders});
                console.log("new posts: ",this.state.posts);
                this.setState({fullData: fetchedOrders,posts:fetchedOrders.slice(0, this.state.postsPerPage)});
            this.setState({totalPages: Math.ceil(this.state.fullData.length/this.state.postsPerPage)});
           

        } else{
            this.props.onFetchOrders(this.props.token,this.props.userId)
        .then(response=> {
            console.log("lists");
            console.log(response);
            
            this.setState({fullData: response,posts: response.slice(0, this.state.postsPerPage)});
            this.setState({totalPages: Math.ceil(response.length/this.state.postsPerPage)});
        })  
        }
    }
           
    
addPostHandler = () => {
        this.props.history.push('/dashboard/posts/newPost');
    }

pageChange = ({ activePage }) => {

    console.log("activePage", activePage)
    const { postsPerPage } = this.state;
    const fromIndex = (activePage - 1) ? ((activePage - 1) * postsPerPage) : 0;
    const tillIndex = activePage * postsPerPage;
    const arr = this.state.fullData.slice(fromIndex, tillIndex);
    this.setState({ posts: arr, currentPage: activePage });
  }

previewHandler = (id) => {
    console.log("preview");
    console.log(id);
        this.props.history.push(`/dashboard/preview/${id}`);
}

editHandler = (id) => {
    console.log("edit");
    console.log("title", this.props.title);
    console.log("description",this.props.description);
    console.log("id: ",this.props.id);
    this.props.history.push(`/dashboard/posts/${id}`)
    }

deleteHandler = async(id) => {
        console.log("Delete...");
   
        await Axios.delete(`newPosts/${id}.json`)
                console.log("Pagination delete");
            this.props.onFetchOrders(this.props.token,this.props.userId)
            .then(response =>{
                Axios.get('/newPosts.json')
                .then(response => {
                  
                    console.log(response);
                    console.log("userId data...");
                    
                     const fetchedOrders=[];
                     for(let key in response.data) {
                         fetchedOrders.push({
                             ...response.data[key],
                             id:key
                         });
                     }
                console.log("fetched after delete",fetchedOrders);
                console.log("new response");
                console.log("token :",this.props.token);
                console.log("userId :",this.props.userId);
                this.setState({fullData: fetchedOrders,posts:fetchedOrders.slice(0, this.state.postsPerPage)});
                this.setState({totalPages: Math.ceil(this.state.fullData.length/this.state.postsPerPage)});
                // this.setState({fullData: response,posts: response.slice(0, this.state.postsPerPage)});
                // this.setState({totalPages: Math.ceil(response.length/this.state.postsPerPage)});
            })

        })
    
}
    render(){
      let isAdmin;

      if(localStorage.getItem('email') == 'admin@gmail.com'){
          isAdmin=true
      }
      else{
          isAdmin=false
      }
        console.log("length");
            let posts;
            console.log(this.props.list.length);
            if(this.state.posts.length != 0 ){

        posts = 
               <Table border="1" width="80%">
                   <Table.Header>
                       <Table.Cell><b>Title</b></Table.Cell>
                        <Table.Cell><b>Type</b></Table.Cell>
                       <Table.Cell><b>Created Date</b></Table.Cell>
                       <Table.Cell><b>Updated Date</b></Table.Cell>
                       <Table.Cell><b>Actions</b></Table.Cell>
                   </Table.Header>
                  
              
                {this.state.posts.map(l => (      //array to array of JSX
                    <Table.Row>  
                        <Table.Cell>{l.title}</Table.Cell>
                        <Table.Cell>{l.type}</Table.Cell>
                        <Table.Cell>{l.createdDate}</Table.Cell>
                        <Table.Cell>{l.updatedDate} </Table.Cell>
                        {isAdmin && (
                            <Button
                            onClick={() =>
                                window.confirm("Are you sure you wish to delete this item?") &&
                                this.deleteHandler(l.id)
                            }> Delete
                        </Button>
                            // <Button onClick={
                                
                            //     (id) =>this.deleteHandler(l.id)}>Delete</Button> 

                        )}
                       
                         <Button onClick={(id) =>this.editHandler(l.id)}>Edit</Button> 
                         <Button onClick={(id) =>this.previewHandler(l.id)}>Preview</Button> 
                         

                    </Table.Row>
                ))}
                </Table> 
            }else{
                posts = <h1> No Data Found </h1>
            }
        
         return(
            <div><Menu.Item position="right">
                 <Button onClick={this.addPostHandler} position="right">+ Add </Button></Menu.Item><br/><br/> 
                <ErrorBoundry>
                   
                {posts}
                </ErrorBoundry><br/>
                <Pagination
                    onPageChange={(e, data) => this.pageChange(data)}
                    postsPerPage ={this.state.postsPerPage}
                    boundaryRange={1}
                    boundaryRange={0}
                    defaultActivePage={1}
                    totalPages={this.state.totalPages}
                    siblingRange={null}
                    lastItem={null}
                    firstItem={null}
                    ellipsisItem={null}
                />
              
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

