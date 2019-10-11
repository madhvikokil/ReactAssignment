import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import{Button} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
            name='about us'
            active={activeItem === 'about us'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
           as={Link} to='contactus'
            name='contact Us'
            active={activeItem === 'contact us'}
            onClick={this.handleItemClick}
          />
         <Button class="ui button" as={Link} to ='signup'>Sign Up</Button>
         <Button class="ui button" as={Link} to ='login'>Log In</Button>
        </Menu>
      </Segment>


    )
  }
}

export default HeaderElement;
