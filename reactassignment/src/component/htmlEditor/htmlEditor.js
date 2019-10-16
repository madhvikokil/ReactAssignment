import React from 'react';
import {connect} from 'react-redux';
import actions from '../../store/actions/auth/auth';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
import Axios from '../../axios-orders';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
// import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

const config={
    placeholderText: 'Edit Here!',
    charCounterCount: false,
    events : {
        'froalaEditor.focus' : function(e, editor) {
          console.log(editor.selection.get());
        }
    }
}

class HtmlEditor extends React.Component {

    state ={
        title : '',
        description: ''
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
            description: this.state.description
        }
        Axios.post('/data/text.json',info);
        // this.props.dataHandler(info,this.props.token)
    }

render(){
    return(
        <div>
            <h5> Enter Title </h5>
            <input type="text" placeholder="title" onChange={this.updateInput}/>        
        <h5>Enter Description</h5>
        <FroalaEditor
            tag='textarea'
            config={config}
            onModelChange={this.updateDescription}
        />
        
            <br/><br/>
            <button onClick={this.addPost}> Add </button>
        </div>
    )
}
}

// const mapStateToProps =(state) => {
//     return{
//         token: state.auth.token
//     }
    
// }

// const mapDispatchToProps = (dispatch) => {
//     return{
//         dataHandler: (info,token) => dispatch(actions.dataSubmit(info,token))
//     }


// }

export default HtmlEditor;


