import React, {Component} from 'react';
import { Icon, Container, Header, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

/**
 * Render recipe page 
 * information include: dish name, image, ratings, cooking time, total time, calories, ingredients, cooking method
 */
export class Recipe extends Component {
    constructor(props){
        super(props)
    }

    render(){
        const {recipe} = this.props
        console.log(this.props.recipe)
        return(
            <div className="total" style={{margin:100}}>
                <div className="container-holder" style={{width: 400, marginLeft:"auto", marginRight:"auto"}}>
                    <img src={recipe.dish_image[0]} style={{width: 400}}/>
                </div>

                <div className="info" style={{marginTop:50}}>
                <Container fluid>
                    <Header as='h1' style={{textAlign:"center"}}>{recipe.dish_name}</Header>
                    <Segment piled style={{textAlign:"center"}}>
                        <Icon name="time"/>Total time needed: {recipe.total_time} ---  (Estimate cooking time: {parseInt(recipe.cooking_time)} mins )<br/>  
                        <Icon name="star"/>Ratings: {recipe.ratings} <br/>
                        <Icon name="fire"/>Calories: {recipe.calories}  
                    </Segment>
                    <p style={{marginLeft: 100}}> 
                        <Header as='h2'>ingredients:</Header>
                        <ul>
                            {recipe.ingredients.map(ingredient => 
                                <li> {ingredient} </li>
                            )}
                        </ul>
                    </p>
                    <p style={{marginLeft: 100}}> 
                        <Header as='h2'>Cooking methods:</Header>
                        <ul>
                            {recipe.cooking_methods.map((method, index) =>
                            <p as='h5'> {index+1}. {method} </p>
                    )}
                            )}
                        </ul>
                    </p>
                    </Container>
                </div>
            </div>
        )
    }
}