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
First, the following information will be scraped from the website mentioned above:
- dish name
- prep time
- cooking time
- total time
- ratings
- ingredient
- cooking methods 
These data will be stored as JSON format in local machine.

Third, the user information will include:
- username
- password
- weight(self report)
- calories(self report)  
These information will be stored in MongoDB.

### Scope of the project
- Since this website only have Chinese food recipes, it may not fit those who do not eat Chinese food. I will consider to include more type of food recipes in the future.
- This project mainly use what we have learned before, including web scraper, database, api setup, data visualization. Therefore, I think I should be able to handle them. However, I am not quite specialized with React.js, but I have learned javascript from React Native. Therefore, I think it will be a challenge but not very hard.

## Sketch
![Sketch](Sketch.png)

## Weekly BreakDown
### First week (backend)

Functionality (15 total)  

Category | Score Allocated | Detailed Rubrics
-------- | --------------- | ----------------
Scrape data | 5 | <ul><li>0 points: lack of any form of a web scraper</li><li>2 points: scrapper works but cannot scrape 100+ recipes</li><li>4 points: complete 100+ recipes saved in local machine</li><li>5 points: 100+ recipes in JSON format</li></ul>
Set up MongoDB storing user information | 4 | <ul><li>0 points: no database set up</li><li>1 points: system setup with a database</li><li>2 points: system can read from the database without errors</li><li>4 points: system can write information into the database without errors</li></ul>
Export JSON from database | 2 | <ul><li>0 points: cannot export data in JSON format</li><li>2 points: system can export JSON from the database without errors</li></ul>
Import CSV file to database | 2 | <ul><li>0 points: cannot import CSV format data</li><li>2 points: system can import CSV file to the database without errors</li></ul>
Solve sensitive information | 1 | Solve sensitive information saving problems for the database and other sensitive/dynamic variables
Pylint | 1 | Shows a score 8.5/10 or above in the pylint report

Test (10 total)  

Category | Score Allocated | Detailed Rubrics
-------- | --------------- | ----------------
Unittest | 5 | <ul><li>0 points: no test</li><li>+1 point for every two tests</li></ul>
Manual test plan| 5 | <ul><li>0 points: no manual test plan</li><li>1 pts if the test plans include only environment setup OR scenario descriptions</li><li>3 pts for test plans that contained only some content and can be further improved (~3 pages)</li><li>5 pts for test plans that contained most of the content (~4 pages)</li></ul>


### Second week (front-end home page && recipe page)

Functionality (15 total)  

Category | Score Allocated | Detailed Rubrics
-------- | --------------- | ----------------
API setup | 8 | <ul><li>0 points: no API</li><li>+2 point for each of CRUD for user infor(username and password)</li></ul>
render Home page(without search) | 4 | <ul><li>0 points: empty page</li><li>+2 point for rendering preview of recipe</li><li>+2 point for navigation between recipe page, home page and user page(could be empty in current week)</li></ul>
render recipe page | 3 | <ul><li>0 points: no recipe page</li><li>+1 point for include each two of the information mentioned above</li></ul>

Test (10 total)  

Category | Score Allocated | Detailed Rubrics
-------- | --------------- | ----------------
Unittest | 3 | <ul><li>0 points: no test</li><li>+1 point for every two new tests</li></ul>
Manual test plan| 7 | <ul><li>0 points: no manual test plan</li><li>1 pts if the test plans include only environment setup OR scenario descriptions</li><li>3 pts for test plans that contained only some content and can be further improved (~6 pages)</li><li>5 pts for test plans that contained most of the content (~8 pages)</li><li>7 pts for well-composed test plans covering all aspects of the system(~10 pages)</li></ul>

### Third week (front-end user page && data visualization)
Functionality (15 total)  

Category | Score Allocated | Detailed Rubrics
-------- | --------------- | ----------------
Render user page with login page | 6 | <ul><li>0 points: no user page</li><li>+2 points: users can successfully login</li><li>+2 points: users can add weight for the day, and recorded in the database</li><li>+1 points: users can add calories for the day, and recorded in the database</li></ul>
Data analysis for weight and calories | 4 | <ul><li>+2 points: graph for weight</li><li>+2 points: graph for calories</li></ul>
Search recipes | 3 | <ul><li>0 points: no search functionality in home page</li><li>2 points: partially works</li><li>3 points: works by searching keywords in recipe name</li></ul>

Test (10 total)  

Category | Score Allocated | Detailed Rubrics
-------- | -------------- | ----------------
Unittest-Data Analysis | 3 | <ul><li>0 points: no test</li><li>+1 point for every new two tests</li></ul>
Manual test plan| 7 | <ul><li>0 points: no manual test plan</li><li>1 pts if the test plans include only environment setup OR scenario descriptions</li><li>3 pts for test plans that contained only some content and can be further improved (~12 pages)</li><li>5 pts for test plans that contained most of the content (~14 pages)</li><li>7 pts for well-composed test plans covering all aspects of the system(~16 pages)</li></ul>
