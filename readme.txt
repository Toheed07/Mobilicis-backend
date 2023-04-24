# Mobilicis

THE PROJECT IS LIVE BUT DATABASE IS NOT CONNECTED

Frontend: https://github.com/Toheed07/Mobilicis-frontend
Backend: https://github.com/Toheed07/Mobilicis-backend
Description:

In this project, I used React JS as the frontend, Node.js as the backend, and MongoDB as the database.
Frontend:

I used React JS and Bootstrap for the frontend; I created a table with filter options to filter users based on selected options. There is a single component, Home, in which I used useState and useEffect to fetch data whenever the option is changed and display it in table format.

Backend: 
 I used Node.js to write API calls to the database, which is MongoDB. I also used Mongoose and Express, which are frameworks for MongoDB and Node.js.

Api calls:
 First, I fetch all users and assign them to a global variable.    1. Users who have an income lower than $5 USD and have a car of the brand "BMW" or "Mercedes" In this, I filter the users using the javascript filter method, and in this, I had to replace the dollar ($) so that I could convert it to a float and apply logic.   2. Male users who have a phone price greater than 10,000 In this, I filter the users using the Javascript filter method.
3. Users whose last name starts with "M" and has a quote character length greater than 15 and whose email includes his or her last name In this, I filter the users using the javascript filter method, and I had to use startsWith to get users whose last name starts with "M" and includes to check if email includes last name.
4. Users who have a car of the brand "BMW," "Mercedes," or "Audi" and whose email does not include any digits In this, I filter the users using the javascript filter method and regex; I used includes to check if the user has a car of the brand "BMW," "Mercedes," or "Audi," and regex to check if the email includes any digit.
5. Show the data of the top 10 cities that have the highest number of users and their average income. In this, I created two objects (cityCounts and cityIncomes) to store the count and total income of each city. Then we loop through each user in the dataset, checking their city. If the city already exists in cityCounts and cityIncomes, we simply increase the count and add the user's income to the total. If the city doesn't exist in the objects yet, we initialise the count to 1 and the total income to the user's income. Then I get the top 10 cities by sorting them in descending order based on their count and then slicing them. Finally, create a new object from the top 10 cities with its name, user count, and average income. The average income is calculated by dividing the total income of the city by its user count.


Thank you,  