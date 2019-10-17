import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import{Button} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HeaderElement extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            as={Link} to='home'
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
           as={Link} to='aboutus'
            name='aboutus'
            active={activeItem === 'aboutus'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
           as={Link} to='contactus'
            name='contactus'
            active={activeItem === 'contactus'}
            onClick={this.handleItemClick}
          />
{/* 
         if(this.props.isAuthenticate) ?  */}
         <Button class="ui button" as={Link} to ='signup'>Sign Up</Button>
         <Button class="ui button" as={Link} to ='login'>Log In</Button>
         <Button class="ui button" as={Link} to ='logout'>Log out</Button> 
        </Menu>
      </Segment>


    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticate :state.red.token !==null
  }
}


export default connect(mapStateToProps)(HeaderElement);
