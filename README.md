<h1 align="center">Labs9 Knowledge Without College</h1>
<div align="center"> <img src="https://i.ibb.co/8cjQJn1/logo-with-light-green-text.png" alt="Knoledge Without College Blue and Orange Logo"/></div>

<div align="center"><h2>Brought to you by:</h2>

<a href="https://github.com/brianmgre">Brian Gregorious</a>

<a href="https://github.com/Charletta">Charletta Bullard</a>

<a href="https://github.com/sarahtennis">Sarah Tennis</a>

<a href="https://github.com/SavannahGreuel">Savannah Greuel</a>

<a href="https://github.com/yusufnafey">Yusuf Nafey</a>
</div>
<br>
<br>

<!-- Table Of Contents -->

<!-- Tech Stack -->
# Tech Stack
### Frontend built using:
* React.js
* SCSS
* Netlify

Deployed [here](https://knowledge-without-college.netlify.com/)

### Backend built using:
* PostgresQL
* Knex
* Express
* Node.js
* Heroku

Deployed [here](https://knowledge-without-college.herokuapp.com/test)

<!-- Reasoning -->
### Reasoning

* React.js
    * We chose to work with React as our framework. When we planned out how we were going to build out our application, we noticed that our components would be interacting with one another. Not only that, but the components were being reused in many different situations. Using a framework like React, which helps with the user experience and an has increased speed with the virtual DOM, seemed like the best route to take.

* Netlify
    * Although problems can arise if this application were to be used on a larger scale, we decided to work with Netlify for two main reasons. First and most importantly, all of the members on our team have previously been exposed to Netlify and we were at least somewhat familiar with it. Aside from that, we didn’t have the intention to use this application on a larger scale, at least in the near future.

* PostgreSQL
    * Because many of the components in our application were related to one another, we decided to use an SQL database like PostgreSQL. PostgreSQL supports JSON and has no transitioning query languages for deployment. Our data was also relational, which worked perfectly with PostgreSQL.

* Express/Node.js
    * Using Express and Node.js was a no brainer for all the members on our team. It offers a large number of free tools and the speed and performance of these solutions is known to be exceptional. It works with JSON, which is what we planned on using. Not only that, but it maintains the same language throughout the project both on the client and the server.

* Heroku
    * The reasoning behind using Heroku was similar to the reasoning for the use of Netlify. We were all familiar with Heroku and didn’t plan to use this application on a large scale anytime soon, so in this situation using a deployment site like Heroku seemed like the most logical route to take.

* CSS/SCSS
    * We decided to stick with plain old styling rather than use a component library like ReactStrap or Material UI for a number of reasons. It gave us more flexibility in terms of how we wanted to style our components. Not only that, but there was nobody on our team that had been familiar with an outside component library, so we stuck with regular styling. On top of that, using SCSS as our preprocessor made the process much easier with the accessibility to variables and mixins.


<!-- Testing -->
# Testing
Testing of this application was completed through every stage of development using terminal logging, PGAdmin page, Chrome DevTools, and Postman. Testing was incorperated into this application by each contributor before submitting a pull request to the master branch and after each merge to ensure all elements of the code were working together properly.

In addition, all pull requests wer reviewed by one or more team members, along with our project manager. 

The application was set to continuously deploy to Netlify and Heroku. In order to satisfy the requirements of continuous deployment, our deployment branch was automatically checked upon every pull request to make sure the new code would not break the build.

Additional testing for both the front end and back end was also written and can be found at the file path below
* Front End (front-end/src/App.test.js)
* Backend (backend/_ _tests_ _ )

<!-- Installation Instructions -->
# Installation Instructions

### Environment Variables

##### Front-end variables:
` REACT_APP_DB_URL = url` is the connection to the Heroku database
See Firebase section for Firebase variables
See Cloundinary for Cloudinary variables

##### Back-end variables:

`DATABASE_URL` is the variable given by Heroku, link to connect to database 
`DB` which relays `dbEnviroment` to use production or development
The rest of the variables are for connecting Postgres locally.

`DB_HOST` would be the `localhost` on your computer
`DB_NAME` is your database name
`DB_USER` is the username you setup
`DB_PASS` is your password

### Using the Application

* You will need:
	* Node
    - Package manager
        - **Yarn** was used to build this project and will continued to be used for maintenance

Once you have node and a package manager:
  
1. Fork and clone repo
2.  Add an `.env` file to both `front-end` and `backend` at the root of each folder (same level as package.json file). Add Environment Variables for both front-end and backend. 
3. `cd` into `backend`. Run `yarn install` to  install the necessary node_modules
4. `cd ..` to get back to main folder and `cd` into `front-end`
5. Run `yarn install` from `front-end` folder to install the necessary node_modules
6. Once completed run `yarn start` to start the application

<!-- Contributing -->
<!-- Data Modals -->
<!-- Postgres -->
<!-- Stripe -->
<!-- Cloudinary-->
<!-- Firebase -->
<!-- Payment Structure -->
<!-- Design-->
