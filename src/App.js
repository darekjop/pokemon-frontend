import React, {Component} from 'react';
import './App.css';

import Login from './pages/Login';
import Pokemon from'./pages/Pokemon';
import {BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-notifications/dist/react-notifications.css';
import '../node_modules/react-notifications/dist/react-notifications.js';

export default class App extends Component{

  
  render(){
  return (    
    <Router>
      <Switch>
    <div className="App">          
                                 
          <Route path="/" exact  component={Login} />        
          <Route path="/pokemon" exact component={Pokemon} />           
    
    </div>
    </Switch>
    </Router>
   
  );
  }
}

