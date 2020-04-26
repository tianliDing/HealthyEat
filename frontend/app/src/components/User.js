import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import 'semantic-ui-css/semantic.min.css';
import { Card, Image } from 'semantic-ui-react'
import SplitPane, { Pane } from 'react-split-pane';
import './User.css'


export function User(props){
// export const User = (props) => (
console.log(props)
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear();
today = mm + '/' + dd;
console.log(today)

const cal_data = []
props.calories.forEach(obj => {
    const {date, cal} = obj
    cal_data.push({
        name: date,
        calories: cal,
    })
});

const wt_data = []
props.weight.forEach(obj => {
    const{date, wt} = obj
    wt_data.push({
        name: date,
        weight: wt,
    })
})

console.log(cal_data)
console.log(wt_data)
return(
        <div class="container">
            <div class="leftpane">
                    <Card>
                        <Image src='https://www.vexels.com/media/users//3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg' wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>Username/Email: </Card.Header>
                        <Card.Description>{props.username}</Card.Description>
                        </Card.Content>
                    </Card>
            </div>
            <div class="rightpane">
                <p>CALORIES CHART</p>
                <hr></hr>
                <LineChart width={600} height={300} data={cal_data}>
                    <Line type="monotone" dataKey="calories" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
                
                <p>weight chart</p>
                <hr></hr>
                <LineChart width={600} height={300} data={wt_data}>
                    <Line type="monotone" dataKey="weight" stroke="#82ca9d" />
                    <CartesianGrid stroke="#ccc" />
                    <Tooltip />
                    <XAxis dataKey="name" />
                    <YAxis />
                </LineChart>
            </div>
        </div>
    )
}
{/*<div className="users">
            <SplitPane split="vertical" defaultSize={200} primary="second">
            <div style={{width:400}}>
                <Card>
                    <Image src='https://www.vexels.com/media/users//3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg' wrapped ui={false} />
                    <Card.Content>
                    <Card.Header>Username/Email: </Card.Header>
                    <Card.Description>{props.username}</Card.Description>
                    </Card.Content>
                </Card>
            </div>
            <div>
            <LineChart width={600} height={300} data={cal_data}>
                <Line type="monotone" dataKey="cal" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
            </div>
        </SplitPane> 
        
    </div>*/}