const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const configureRoutes = require('./payment');

configureRoutes(app);

app.listen(9000, error => {
	if (error) throw error;
	console.log('Server running on port ' + 9000);
});
