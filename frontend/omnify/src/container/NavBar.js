import React from 'react'
import {Menu,Container,Image, Icon} from 'semantic-ui-react'

import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';


function Header({user}) {
  
  
  return (
    <Menu fluid id='menu' inverted>
      <Container text>
        <Link to='/'>
          <Menu.Item header>
              Page 1
          </Menu.Item>
        </Link>
        <Link to='/second'>
          <Menu.Item header>
            Page2
          </Menu.Item>
        </Link>
        
        
      </Container>
    </Menu>
  )
}

export default Header;