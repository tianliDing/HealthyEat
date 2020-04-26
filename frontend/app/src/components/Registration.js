import React, {useState} from 'react';
import axios from 'axios';
// import { Redirect } from "react-router-dom";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Home } from './Home'

/**
 * Render Register page 
 */
export function Registration(props){
  const [state , setState] = useState({
    email : "",
    password : "",
    confirmPassword: "",
    success: "no",
    match_pw: "yes",
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
    if(state.password === state.confirmPassword) {
      console.log("send details to server")
      sendDetailsToServer()    
    } else {
      setState({match_pw: "no", success: "no"})
      console.log("password dismatch")
    }
  }

  const sendDetailsToServer = () => {
    if(state.email.length && state.password.length) {
        console.log("both values got")
        const payload={
            "Username":state.email,
            "Password":state.password,
            "Calories":[],
            "Weight":[]
        }

        axios.post('/api/users', payload)
            .then(function (response) {
                if(response.status === 201){
                  setState({match_pw:"yes",success: "yes"})
                } else{
                    console.log("error")
                }
            })                                       
            .catch(function (error) {
                console.log(error);
            })
      } else {
        console.log('Please enter valid username and password')    
    }  
  }

  return (
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
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
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
          <div className="form-group text-left">
              <label htmlFor="exampleInputPassword1">Confirm Password</label>
              <input type="password" 
                  className="form-control" 
                  id="confirmPassword" 
                  placeholder="Confirm Password"
                  value={state.confirmPassword}
                  onChange={handleChange} 
              />
          </div>
          <button 
              type="submit" 
              className="btn btn-primary"
              onClick={handleSubmitClick}
          >
              Register
          </button>
        </form> 
        <p>
          {state.match_pw === "yes"? "": "Password unmatch!"}
        </p>
        <p>
          {state.success === "no" ? "Already have an account? Please click Login on the right corner": 
                                    "Successfully created a new account, please login!"}
        </p>
    </div>
  );
}