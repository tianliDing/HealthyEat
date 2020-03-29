# Healthy Eat
By Tianli Ding (td2)  
Moderator: Haiming Zhang (haiming2)  
This is a mobile app for CS242 final project

## Abstract
### Project Purpose & Motivation
Due to the coronavirus, everybody is asked to stay at home. Therefore, I started to cook for myself everyday at home. However, it is hard to cook for newbies like me without recipe. Hence, I am planning to develop a platform with hundreds of recipes. Besides, many girls, including me, care about their weight, especially in the situation that we can barely go out for walking and working out. I decide to add functionalities helping to record, track weight and/or calculate total calories for each day, so that people who need control weight, like athletes, could use it for documentation.  

## Technical Specification
Platform: React.js 
Programming Languages: JavaScript (Python for Flask should backend required)
Stylistic Conventions: Airbnb JavaScript Style Guide & PEP8 Standard
IDE: Visual Studio Code
Tools/Interfaces: Website, a laptop will be fine
Target Audience: People interested in Chinese food, and need of recording weight

## Functional Specification
### Features:
First, the following information will be scraped from the website mentioned above:
- dish name
- prep time
- cooking time
- total time
- ratings
- ingredient
- cooking methods 
These data will be stored as JSON format in local machine.

Second, the developed website allow users to search for the keyword of the recipe.  

Third, the user information will include:
- username
- password
- weight(self report)
- calories(self report)  
These information will be stored in MongoDB.

### Scope of the project
- Limitations: Since this website only have Chinese food recipes, it may not fit those who do not eat Chinese food. I will consider to include more type of food recipes in the future.

## Sketch
![Sketch](Sketch.png)

## Weekly BreakDown
### First week (backend)
Category | Total Score Allocated | Detailed Rubrics
-------- | --------------------- | ----------------
Scrape data | 5 | <ul><li>0 points: lack of any form of a web scraper</li><li>2 points: scrapper works but cannot collect 100+ recipes</li><li>5 points: complete 100+ recipes saved in local machine</li></ul>
Set up MongoDB storing User Information | 3 | - 0 points: no database set up - 1 points: system setup with a database - 2 points: system can read from the database without errors - 3 points: system can write from the database without errors

