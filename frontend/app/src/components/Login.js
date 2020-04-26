import React, {useState} from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import SplitPane, { Pane } from 'react-split-pane';
// import { Card, Image } from 'semantic-ui-react'
import { User } from './User'

/**
 * Render Login page 
 * login with username and password
 */
// export class User extends Component {
export function Login(){
  const [state , setState] = useState({
    email : "",
    password : "",
    calories: [],
    weight: [],
    email_success: true,
    pw_success: true,
    login_sucess: "no"
  })

  const handleChange = (e) => {
    console.log("changed");
    const {id , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    console.log("submitted");
    axios.get('/api/users', {    
            params: {
            Username: state.email
        }})
        .then(function (response) {
            if(response.status === 200){
                console.log(response.data.data)
                console.log(state.password)
                console.log(response.data.data.length)
                if(response.data.data.length === 0){
                    console.log("it is nothing ")
                    setState({email_success: false, pw_success: true, login_sucess: "no"})
                }else if (state.password === response.data.data[0].Password){
                    console.log("password match!")
                    setState({login_sucess: "yes",
                              email: response.data.data[0].Username,
                              calories: response.data.data[0].Calories,
                              weight: response.data.data[0].Weight  })
                }else{
                    setState({pw_success: false, email_success: true, login_sucess: "no"})
                }
            } else{
                console.log("what?")
            }
        })
        .catch(function (error) {
            console.log("there is error")
            console.log(error);
        });   
    }

    return (
        // <Router>
        <div >
            {state.login_sucess === "no"? 
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email"
                        value={state.email}
                        onChange={handleChange}
                />
                </div>
                <p>
                    {state.email_success ? "Please enter registered email": "No matched Username! Please register first!"}
                </p>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <p>
                    {state.pw_success ?  "Please enter correct password": "Wrong Password! Try again!"}
                </p>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Login
                </button>
                </form>
                <div className="mt-2">
                    <span>Do not have an account? Please click Register on the right corner.</span>
                </div>
            </div>
        :
            // <div className="users">
            //     <SplitPane split="vertical">
            //         <Card>
            //             <Image src='https://www.vexels.com/media/users//3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg' wrapped ui={false} />
            //             <Card.Content>
            //             <Card.Header>Username/Email: </Card.Header>
            //             <Card.Description>{state.email}</Card.Description>
            //             {/* <Card.Description>
            //                 {state.calories[0]}
            //             </Card.Description> */}
            //             </Card.Content>
            //         </Card>
            //     {/* <Pane initialSize="75%">You can use a Pane component</Pane> */}
            //     <div></div>
            //     {/* 
            //         <Pane initialSize="200px">You can use a Pane component</Pane>
                    
            //         <Pane initialSize="25%" minSize="10%" maxSize="500px">Using a Pane allows you to specify any constraints
            //             directly</Pane>
            //     </SplitPane> */}
            //     </SplitPane>
            // </div>
            <User username={state.email} calories={state.calories} weight={state.weight}/>
        }
        </div>
    );
}

export default withRouter(Login);