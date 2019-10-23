import React from 'react';
import {connect} from 'react-redux';
import { submit } from '../../store/actions/auth/auth';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditor from 'react-froala-wysiwyg';
import { withRouter } from 'react-router-dom';
import Axios from '../../axios-orders';
import moment from 'moment';

let a="vaishnavi"
const config={

    charCounterCount: false,
    model:{a},
    events : {
        'froalaEditor.focus' : function(e, editor) {
          console.log(editor.selection.get());
        }
    }
}

class HtmlEditor extends React.Component {
    
 componentDidMount() {
      
        if(this.props.match.params.id !== 'newPost'){
            console.log(this.props.match.params.id);
            Axios.get(`newPosts/${this.props.match.params.id}.json`)
            .then(response => {
                this.setState({title:response.data.title,description:response.data.description})
             
            })
            .catch(error => {
                console.log(error)
            })
        }
      
       
    }
    state ={
        title :'',
        description: '',
        createdDate:'',
        updatedDate:''
    }

    updateInput =(event) => {
        this.setState({title: event.target.value})
    }

    updateDescription = (event) => {
        console.log("updating");
        this.setState({description:event})
    }

    addPost=(event) => {
        event.preventDefault();
        console.log("added Post...");
        console.log(this.state.title);
        console.log(this.state.description);
        console.log(this.state);
        const info = {
            title : this.state.title,
            description: this.state.description,
            userId:this.props.userId,
            createdDate:moment().format('lll'),
            updatedDate:moment().format('lll')
        }
         this.props.dataHandler(info,this.props.token)
    }

    saveEditChanges =() => {

    const editData = {
        title:this.state.title,
        description:this.state.description,
        updatedDate:moment().format('lll')
    }

    Axios.patch(`newPosts/${this.props.match.params.id}.json`,editData)
    .then(response => {
       console.log(response)
       alert("Successfully edited...");
    
    })
    .catch(error => {
        console.log(error)
    })
        
    }

render(){
    let edit;
    if(this.props.match.params.id !== 'newPost'){
         edit = <button onClick={this.saveEditChanges}> Edit Save </button>
    }
    else{
        edit = <button onClick={this.addPost}> Save </button>
    }

    return(
        
        <div>
            <h5> Enter Title </h5>
            <input type="text"
                 placeholder="Enter Title" 
                 onChange={this.updateInput} 
                 value={this.state.title}
                 width="100"
            />        

        <h5>Enter Description</h5>
        <FroalaEditor
            tag='textarea'
            model={this.state.description}
            config={config}
            onModelChange={this.updateDescription}
        />
        
        {/* <FroalaEditorView
        model={this.state.description}
/> */}
            <br/><br/>
            
            {/* <button onClick={this.addPost}> Save </button> */}
            {edit}
            {/* <button onClick={this.saveEditChanges}> Edit Save </button> */}
        </div>
    )
}
}

const mapStateToProps =(state) => {
    return{
        token: state.red.token,
        userId :state.red.userId   
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return{
        dataHandler: (info,token) => dispatch(submit(info,token))
    }


}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HtmlEditor));


