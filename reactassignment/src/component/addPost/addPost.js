import React from 'react';
import HtmlEditor from '../htmlEditor/htmlEditor';

class AddPost extends React.Component {
    render(){
        return(
           <div>
                <h1> Add new Post </h1>
                <HtmlEditor />
            </div>
        )
}
}

export default AddPost;