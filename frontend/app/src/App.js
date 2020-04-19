import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from './components/Home';
import { User } from './components/User';
import { About } from './components/About';
import { NavigationBar } from './components/NavigationBar';
import './App.css';

/**
 * a navigator created
 */
class App extends Component{
  render(){
    return(
      <React.Fragment>
        <Router>
          <NavigationBar />
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/user" component={User} />
              <Route path="/about" component={About} />
              {/* <Route component={NoMatch} /> */}
          </Switch> 
        </Router>
      </React.Fragment>
    )
  }
}

export default App;
