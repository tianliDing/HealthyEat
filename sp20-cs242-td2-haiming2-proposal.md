# Healthy Eat
By Tianli Ding (td2)  
Moderator: Haiming Zhang (haiming2)  
This is a website for CS242 final project

## Abstract
### Project Purpose & Motivation
Due to the coronavirus, everybody is asked to stay at home. Therefore, I started to cook for myself everyday at home. However, it is hard to cook for newbies like me without recipe. Hence, I am planning to develop a platform with hundreds of recipes. Besides, many girls, including me, care about their weight, especially in the situation that we can barely go out for walking and working out. I decide to add functionalities helping to record, track weight and/or track total calories for each day, so that people who need control weight, like athletes, could use it for documentation.  

## Technical Specification
- Platform: React.js 
- Programming Languages: JavaScript (Python for Flask should backend required)
- Stylistic Conventions: Airbnb JavaScript Style Guide & PEP8 Standard
- IDE: Visual Studio Code
- Tools/Interfaces: Website, a laptop will be fine
- Target Audience: People interested in Chinese food, and need of recording weight

## Functional Specification
### Features:
The following __recipe information__ will be scraped from the website mentioned above:
- dish name
- prep time
- cooking time
- total time
- ratings
- ingredient
- cooking methods  
 These data will be stored as JSON format in local machine.  

Search functionality will be complete for searching recipes in home page.

The __user information__ will include:
- username
- password
- weight(self report)
- calories(self report)  
These information will be stored in MongoDB.
  
User weight and calories reported will be visualized in different graphs in user page.

__API endpoints__:  
GET
- find all user information with that the corresponding username: api/users?username  

PUT
- put or update the first entry of the item returned from the given attribute
- including changing password, update weight, and calories: api/users?attr={attr_value}  

POST
- add users to the backend: api/users  

DELETE
- delete requests to remove the user from the database given username: api/users?username  

Postman can be used to test API.  

### Scope of the project
- Since this website only have Chinese food recipes, it may not fit those who do not eat Chinese food. I will consider to include more type of food recipes in the future.
- This project mainly use what we have learned before, including web scraper, database, API setup, data visualization. Therefore, I think I should be able to handle them. However, I am not quite specialized with React.js, but I have learned javascript from React Native. Therefore, I think it will be a challenge but still should be handle-able.

## Sketch
![Sketch](Sketch.png)

## Weekly BreakDown
### First week (backend)

Functionality (15 total)  

Category | Score Allocated | Detailed Rubrics
-------- | --------------- | ----------------
Scrape data | 4 | <ul><li>0 points: lack of any form of a web scraper</li><li>2 points: scrapper works but cannot scrape 100+ recipes</li><li>4 points: complete 100+ recipes saved in local machine</li></ul>
Recipe model | 3 | <ul><li>0 points: lack of any form of a recipe model</li><li>2 points: there is one but lack of information</li><li>3 points: create a model and parse scraped data into model with complete information listed above, can be printed into terminal</li></ul>
Set up MongoDB storing user information | 5 | <ul><li>0 points: no database set up</li><li>+1 points: system setup with a database</li><li>+1 points: system can read from the database without errors</li><li>+1 points: system can write information into the database without errors</li><li>+1 point: functional database and store user information with encrypted password</li><li>+1 point: system can import CSV file to the database without errors</li></ul>
Export JSON from database | 2 | <ul><li>0 points: cannot export data in JSON format</li><li>2 points: system can export JSON from the database without errors</li></ul>
Pylint | 1 | Shows a score 8.5/10 or above in the pylint report

Test (10 total)  

Category | Score Allocated | Detailed Rubrics
-------- | --------------- | ----------------
Unittest | 5 | <ul><li>0 points: no test</li><li>+1 point for every two tests</li></ul>
Manual test plan| 5 | <ul><li>0 points: no manual test plan</li><li>1 pts if the test plans include only environment setup OR scenario descriptions</li><li>+1pt: for every scenarios included</li></ul>


### Second week (front-end home page && recipe page)

Functionality (15 total)  

Category | Score Allocated | Detailed Rubrics
-------- | --------------- | ----------------
API setup | 8 | <ul><li>0 points: no API</li><li>+2 point for each of CRUD for user information</li></ul>
render Home page(without search) | 4 | <ul><li>0 points: empty page</li><li>+2 point for rendering preview of recipe</li><li>+2 point for navigation between recipe page, home page and user page(could be empty in current week)</li></ul>
render recipe page | 3 | <ul><li>0 points: no recipe page</li><li>+1 point for include each two of the information mentioned above</li></ul>

Test (10 total)  

Category | Score Allocated | Detailed Rubrics
-------- | --------------- | ----------------
Unittest | 3 | <ul><li>0 points: no test</li><li>+1 point for every two new tests</li></ul>
Manual test plan| 7 | <ul><li>0 points: no manual test plan</li><li>1 pts if the test plans include only environment setup OR scenario descriptions</li><li>+1 pt for every new added scenario</li></ul>

### Third week (front-end user page && data visualization)
Functionality (15 total)  

Category | Score Allocated | Detailed Rubrics
-------- | --------------- | ----------------
Render user page with login page | 6 | <ul><li>0 points: no user page</li><li>+2 points: users can successfully login</li><li>+2 points: users can add weight for the day, and recorded in the database</li><li>+1 points: users can add calories for the day, and recorded in the database</li></ul>
Data analysis for weight | 3 | <ul><li>+1 points: static graph</li><li>+2 points: dynamic graph</li><li>+3 points: interactive graph</ul>
Data analysis for calories | 3 | <ul><li>+1 points: static graph</li><li>+2 points: dynamic graph</li><li>+3 points: interactive graph</ul>
Search recipes | 3 | <ul><li>0 points: no search functionality in home page</li><li>2 points: partially works: it can search by full name of the recipe but not single keyword</li><li>3 points: works by searching keywords in recipe name</li></ul>

Test (10 total)  

Category | Score Allocated | Detailed Rubrics
-------- | -------------- | ----------------
Unittest-Data Analysis | 3 | <ul><li>0 points: no test</li><li>+1 point for every new two tests</li></ul>
Manual test plan| 7 | <ul><li>0 points: no manual test plan</li><li>1 pts if the test plans include only environment setup OR scenario descriptions</li><li>+1pt: for every new scenario added in manual test plan</li></ul>
