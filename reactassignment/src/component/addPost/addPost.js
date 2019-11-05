import React from 'react';
import HtmlEditor from '../htmlEditor/htmlEditor';
import { withRouter } from 'react-router-dom'

class AddPost extends React.Component {
    render(){
        return(
           <div>
                <h1> Post </h1><br/>
                <HtmlEditor {...this.props} />
            </div>
        )
}
}

export default withRouter(AddPost);