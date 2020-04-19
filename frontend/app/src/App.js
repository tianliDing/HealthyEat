import React, {Component} from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from './components/Home';
import { User } from './components/User';
import { NavigationBar } from './components/NavigationBar';
import './App.css';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      name:[],
      recipes:[],
    }
  }
  componentDidMount = () => {
    axios.get('/api/home').then(res =>{
      for (var i = 0; i < res.data.length; i++)
      this.setState({
        name: [...this.state.name, res.data.data[i].dish_name]
      })
      console.log(res.data.data)
      console.log(this.state.name)
      this.setState({recipes: res.data.data})
    })
    .catch(function(err){
      console.log(err);
    });
  }
  render(){
    return(
      // <div className="recipes_model"> 
      // {/* <li> "臭粑粑" </li>
      //   {this.state.recipes.map(recipe => <li> {recipe.dish_name} </li>)}
      // <li> "臭粑粑" </li> */}
      //     <Recipes recipe={this.state.recipes}/>
      // </div>
      <React.Fragment>
        <Router>
          <NavigationBar />
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/user" component={User} />
              {/* <Route path="/user" component={User} /> */}
              {/* <Route component={NoMatch} /> */}
          </Switch> 
        </Router>
      </React.Fragment>
    )
  }
}

export default App;
