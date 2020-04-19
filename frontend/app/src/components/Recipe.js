import React, {Component} from 'react';
import { Card, Image, Rating } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

// export function Recipe ({ recipe }) {
//     console.log(recipe)
//     return(
//       <div>
//         <h1>{recipe._id}</h1>
//         {/* {match.params.dish_name} */}
//       </div>
//       )
//   }

export class Recipe extends Component {
    constructor(props){
        super(props)
    }

    render(){
        console.log(this.props.recipe)
        return(
        <div>{this.props.recipe._id}</div>
        )
    }
}