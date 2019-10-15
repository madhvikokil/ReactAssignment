import React from 'react';
import ReactDOM from 'react-dom';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

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

  //$('#editor').froalaEditor('html.set', 'My custom paragraph.');


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

export default HtmlEditor;


