import React from 'react';
import { Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';



/**
 * Render About page 
 * information about the website
 */
export const About = () => (
    <div className="about" style={{margin:100}}>
      <Header as='h1'>About Page</Header>
      <Header as='h3'>Healthy Eat</Header>

        <p>=> INTRODUCTION</p>
        <p>A website of recipe with recipes scrapped from "www.chinasichuanfood.com"</p>

        <p>=> INSTALLATION</p>
        <p>please run "git clone https://gitlab.engr.illinois.edu/td2/sp20-cs242-project.git" in your terminal</p>
        
        <p>=> MORE INFORMATION</p>
        <p>please email dtl6303@gmail.com for questions</p>
    </div>
  )