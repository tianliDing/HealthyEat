import React, {Component} from 'react';
import axios from 'axios';
import { Card, Image, Rating } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Recipe } from './Recipe'
import 'semantic-ui-css/semantic.min.css';


export class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      recipes:[],
    }
  }

  componentDidMount = () => {
    axios.get('/api/home').then(res =>{
      console.log(res.data.data)
      this.setState({recipes: res.data.data})
    })
    .catch(function(err){
      console.log(err);
    });
  }

  render(){
    return(
      <Router>
        <Route exact path="/" render = {()=>
          <div className="recipes_model" style={{alignItems: "center"}}> 
              <Card.Group itemsPerRow={3} style = {{marginLeft:100, marginRight:100, marginTop:40}}>
                {this.state.recipes.map(recipe => 
                // <Link to='/recipes'>
                  <Card style={{marginTop:40}}>
                    <Image src={recipe.dish_image[0]} wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>{recipe.dish_name}</Card.Header>
                      <Link to={`/recipe/${recipe._id}`}>Components</Link>
                      <Card.Meta>
                        <span className='date'>{recipe.calories}</span>
                      </Card.Meta>
                      <Card.Description>
                        total time needed: {recipe.total_time}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        rating: 
                        <Rating rating={parseInt(recipe.ratings.substring(0,3))} maxRating={5} disabled/>
                    </Card.Content>
                  </Card>
              //</Link> 
                )}
              </Card.Group>
          </div>
         } />
          {this.state.recipes && (
            <Route path="/recipe/:recipeId" render={({ match }) => (
              <Recipe recipe={this.state.recipes.find(r => r._id === match.params.recipeId)}/>
            )}/>  
          )}  
      </Router>
    )
  }
}

const Recipe = ({ recipe }) => {
  console.log(recipe)
  return(
    <div>
      <h1>{recipe._id}</h1>
    </div>
    )
}
