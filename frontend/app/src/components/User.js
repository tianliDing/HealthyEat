import React, {useState} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import 'semantic-ui-css/semantic.min.css';
import { Card, Image } from 'semantic-ui-react'
import './User.css'
import axios from 'axios';


/**
 * Render User page with data analysis
 */
export function User(props){
    const [state , setState] = useState({
        calories_today : 0,
        weight_today : 0,
        cal_data: [],
        wt_data : [],
        submitted_cal: "no",
        submitted_wt: "no",
      })

    const handleChange = (e) => {
        console.log("changed");
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClickCal = (e) => {
        e.preventDefault();
        console.log("put to server")
        const temp = []
        state.cal_data.forEach(element => {
            const{name, calories} = element
            temp.push({
                date: name,
                cal: calories
            })
        });
        const payload = {
            "Calories": temp
        }
        console.log(payload)
        connectToServer(payload)
        setState(prevState => ({
            ...prevState,
            submitted_cal:"yes"
        }))
        // setState({submitted_cal:"yes"})
    }

    const handleSubmitClickWt = (e) => {
        e.preventDefault();
        console.log("put to server")
        console.log(state.wt_data)
        const temp = []
        state.wt_data.forEach(element => {
            const{name, weight} = element
            temp.push({
                date: name,
                wt: weight
            })
        });
        const payload = {
            "Weight": temp
        }
        console.log(payload)
        connectToServer(payload)
        setState(prevState => ({
            ...prevState,
            submitted_wt:"yes"
        }))
        // setState({submitted_wt:"yes"})
    }

    const connectToServer = (payload) => {
        axios.put('/api/users', payload, {    
            params: {
            Username: props.username
        }})
        .then(function (response) {
            if(response.status === 200){
                console.log("finished!")
            } else{
                console.log("cannot put")
            }
        })                                       
        .catch(function (error) {
            console.log(error);
        })
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    today = mm + '/' + dd;

    const getDataCal = () => {
        state.cal_data = []
        console.log(props.calories)

        if(props.calories.length!==0){
            props.calories.forEach(obj => {
                const {date, cal} = obj
                state.cal_data.push({
                    name: date,
                    calories: cal,
                })
            });
            if (props.calories[props.calories.length-1].date === today){
                console.log("added already")
                state.calories_today = props.calories[props.calories.length-1].cal
                state.cal_data.pop()
            }
        }
        state.cal_data.push({
            name: today,
            calories: state.calories_today,
        })
        console.log(state.cal_data)
        return state.cal_data
    }
    
    const getDataWt = () => {
        state.wt_data = []
        console.log(props.weight)
        if(props.calories.length!==0){
            props.weight.forEach(obj => {
                const{date, wt} = obj
                state.wt_data.push({
                    name: date,
                    weight: wt,
                })
            })
            if (props.weight[props.weight.length-1].date === today){
                console.log("weight added already")
                state.weight_today = props.weight[props.weight.length-1].wt
                state.wt_data.pop()
            }
        }
        state.wt_data.push({
            name: today,
            weight: state.weight_today,
        })
        console.log(state.wt_data)
        return state.wt_data
    }

    return(
        <div className="container">
            <div className="leftpane">
                    <Card>
                        <Image src='https://www.vexels.com/media/users//3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg' wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>Username/Email: </Card.Header>
                        <Card.Description>{props.username}</Card.Description>
                        </Card.Content>
                    </Card>
            </div>

            <div className="rightpane">
                <p>CALORIES CHART</p>
                <hr></hr>
                <LineChart width={600} height={300} data={getDataCal()}>
                    <Line type="monotone" dataKey="calories" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
                
                <div className="ui form">
                    <div className="field">
                    <label>Today is {today}, please input the number of total calories you ate today</label>
                        <input type="text" 
                               placeholder="xxx cal" 
                               id="calories_today" 
                               value={state.calories_today}
                               onChange={handleChange} />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={handleSubmitClickCal}
                    >
                        submit
                    </button>
                    <h>
                        {state.submitted_cal === "yes"? "  Submitted!": ""}
                    </h>
                </div>

                <p>WEIGHT CHART</p>
                <hr></hr>
                <LineChart width={600} height={300} data={getDataWt()}>
                    <Line type="monotone" dataKey="weight" stroke="#82ca9d" />
                    <CartesianGrid stroke="#ccc" />
                    <Tooltip />
                    <XAxis dataKey="name" />
                    <YAxis />
                </LineChart>

                <div className="ui form">
                    <div className="field">
                    <label>Today is {today}, please input how much you weight(lb) today</label>
                        <input type="text" 
                               placeholder="xxx lb" 
                               id="weight_today" 
                               value={state.weight_today}
                               onChange={handleChange} 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={handleSubmitClickWt}
                    >
                        submit
                    </button>
                    <h>
                        {state.submitted_wt === "yes"? "  Submitted!": ""}
                    </h>
                </div>
            </div>
        </div>
    )
}
