import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Menu, Container, Image, Icon, Button } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from "./container/Layout";
import PageOne from "./container/PageOne";
import Navbar from './container/NavBar'
function App() {
  return (
    
       <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={PageOne} />
          <Route path='/second' component={Layout} />
        </Switch>
      </Router>
    </>
    
  );
}

export default App;
