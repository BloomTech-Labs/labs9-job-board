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
* ` REACT_APP_DB_URL = url` is the connection to the Heroku database
See Firebase section for Firebase variables
See Cloundinary for Cloudinary variables

##### Back-end variables:

* `DATABASE_URL` is the variable given by Heroku, link to connect to database 
* `DB` which relays `dbEnviroment` to use production or development

The rest of the variables are for connecting Postgres locally.
* `DB_HOST` would be the `localhost` on your computer
* `DB_NAME` is your database name
* `DB_USER` is the username you setup
* `DB_PASS` is your password

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
# Data Models
All data models are built using migrations created with the SQL query builder Knex.js. The migrations are structured for a PostgresQL database.

### Login Table
The ‘login’ table is used to store basic user information upon account creation. This allows the user to navigate the site as an authenticated user without being forced to complete their profile information.

```javascript
// Login table data model
tbl.increments();

// Firebase ID
tbl
.string("user_uid", 255)
.notNullable()
.unique();

tbl
.string("email", 128)
.unique()
.notNullable();
});

tbl
.timestamp("created_at")
.defaultTo(knex.raw("now()"))
.notNullable();
```
### Users Table
The ‘users’ table stores the profile and balance information for a user. A user’s row is initially created once the ‘New Account Info’ form displayed on the front end is completed.
```javascript
// Users table data model
// primary key
tbl.increments();

// Firebase user id
tbl
.string("user_uid", 255)
.notNullable()
.unique()
.references("user_uid")
.inTable("login");

tbl.string("first_name", 255).notNullable();

tbl.string("last_name", 255).notNullable();

tbl
.string("email", 128)
.unique()
.notNullable();

tbl.string("company_name", 255).notNullable();

tbl.string("summary", 500).notNullable();

tbl.string("application_method", 128).notNullable();

tbl.string("avatar_image", 200);

tbl
.integer("balance")
.notNullable()
.defaultTo(0);

tbl
.boolean("unlimited")
.notNullable()
.defaultTo(false);

tbl.timestamp("expiration");

tbl
.timestamp("created_at")
.defaultTo(knex.raw("now()"))
.notNullable();

tbl
.timestamp("updated_at")
.defaultTo(knex.raw("now()"))
.notNullable();
});
};
```
### Jobs Table
The ‘jobs’ table holds all the information about a job posting as well as a foreign key reference to the user who posted the job within the ‘users’ table. A user is not able to create a job posting if they have not completed the ‘New Account Info’ form and do not have a valid balance (have not purchased any listing privileges).
```javascript
// primary key
tbl.increments(); // generate and id field and make it autoincfement and the primary key

tbl.string("title", 255).notNullable();

tbl.string("salary").notNullable();

tbl.string("top_skills", 128);

tbl.string("add_skills", 203);

tbl.string("familiar", 128);

tbl.string("description", 4000).notNullable();

tbl.string("requirements", 5000);

tbl
.boolean("active")
.notNullable()
.defaultTo(true);

tbl
.boolean("college_degree")
.notNullable()
.defaultTo(false);

tbl
.date("created_at")
.defaultTo(knex.raw("now()"))
.notNullable();

//foreign key to users DB
tbl
.integer("users_id")
.unsigned()
.references("id")
.inTable("users")
.notNullable();

tbl.string("category");
```

<!-- Postgres -->
# PostgresQL
### Set up – Development
Below are the techniques used by members of our team to create a local database to use during development.
#### Mac
##### Installation/Run
1. First run the following command in your terminal to install PostgresQL using Homebrew. If you do not have Homebrew installed, visit <https://brew.sh>.
    - `brew install postgresql`
2. Next, run the following command to start PostgresQL locally.
    - `brew services start postgresql`
3. Finally, run the following command to enter the psql CLI with the user 'postgres'.
    - `psql postgres`
##### Create Database
After running the command in step 3 of Installation/Run, you should now see something similar to: 
[img]

To create a new database, run the query:
- `CREATE DATABASE database_name;`

Once the database has been created, run the following to connect to it.
- `\c database_name;`

[img]
##### Run Migrations/Seeds
Now that you are connected to your local PostgresQL database through the psql CLI, go into the 'knexfile.js' within the root of the 'backend' directory. Change the variables within the development connection to match the database you just created.
[img]
Once the variables are correct for your local configuration,
1. In the terminal run the following to populate your new database with the tables defined in the Knex migrations.
    - `knex migrate:latest`

2. To create test data for development, run the following within the terminal to populate the tables with premade seed data.
    - `knex seed:run`

3. To test that the migrations and seeds have run correctly is to query each table within the psql CLI to see if the columns are correct. For example,
    - `SELECT * FROM users;`

Once you have verified that the migrations and seeds ran correctly, you are ready to use PostgresQL for development.

#### Windows
##### Installation/Run
Install PostgresQL: <https://www.enterprisedb.com/downloads/postgres-postgresql-downloads>
Follow the instructions provided with the installation and be sure to **remember the username and password you create**.
Once the installation has completed, open PGAdmin and sign in with your new credentials.

##### Create Database
Within PGAdmin, create a new database.

##### Run Migrations/Seeds
Now that the new database has been created, open the 'knexfile.js' within the root of the 'backend' directory.
Change the variables within the development connection to match the database you just created. Make sure to include 'password' or Knex will not be able to authenticate the connection.
[img]
Once the variables are correct for your local configuration, follow steps 1 through 3 in the 'Run Migrations/Seeds' section of the Mac instructions.

### Set up - Production
Our production PostgresQL database is hosted through Heroku. The following instructions will be for **Heroku deployment only**.
1. Create or log in to your account on <https://www.heroku.com/>. From the dashboard, select the 'New' button and choose 'Create new app' from the dropdown menu.
2. After creating your new app, select 'Configure add-ons' to the right of the 'Installed add-ons' header. Within the 'Add-ons' search bar, look for 'postgres' and select 'Heroku Postgres'. After selecting it, you can choose your plan and then provision the new add-on.
3. Navigate to the 'Settings' tab on your app dashboard (not the database dashboard). Under the 'Buildpacks' section, add both of the following. The first will allow you to use a subdirectory (for this application, 'backend') as the root for the deployment build.
    - `https://github.com/timanovsky/subdir-heroku-buildpack.git`
    - `heroku/nodejs`
4. Next, we'll find the URI that you'll need to place within the configuration variables. Navigate to the 'Overview' tab on the app dashboard. Click on 'Heroku Postgres' within your 'Installed add-ons' and you will be redirect to your database dashboard. Select 'Settings' and then 'View credentials...' to find your URI.
5. Go back to your app dashboard and within the 'Settings' tab, add the following configuration variables (Config Vars).
    - **DATABASE_URL**: the URI found in step 4
    - **DB**: production
    - **PROJECT_PATH**: backend
6. Next we will population the database with the tables defined in the Knex migrations. Within Heroku, select 'More' and choose 'Run console'. Once the console appears, type `bash` to access the command line. Within the command line run `knex migrate:latest` to run the Knex migrations. Now within the database dashboard it should now show that the database contains 5 tables and your production database is deployed.




<!-- Stripe -->
<!-- Cloudinary-->
<!-- Firebase -->
<!-- Payment Structure -->
<!-- Design-->
