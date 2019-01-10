const express = require('express');
const knexConfig = require('../knexfile');
const knex = require('knex');


const db = knex(knexConfig.development);
const router = express.Router();


//-------------JOB ENDPOINTS-------------------
// TODO: Need to display a list of all jobs (Get) and Get only one job -- ONCE COMPLETE DELETE THIS TODO

// TODO: Test routes -- ONCE COMPLETE DELETE THIS TODO

// Creating a new job
router.post('/job', (req, res) => {
	const newJob = { ...req.body };

	if (newJob) {
		// TODO: add database
		insert(newJob)
			.then(addJob => {
				res.status(201).json(addJob[0]);
			})
			.catch(error => {
				res.status(500).json({
					errorMessage: 'There was an error adding your job to the database.',
				});
			});
	} else {
		res.status(400).json({
			errorMessage:
				'Please provide the following: Category_Tag, Title, Salary, Top_Skills, Familiar_With, Description, Requirements, Active, Degree_Required for a job to be added.',
		});
	}
});

// Delete a job
router.delete('/job/:id', (req, res) => {
	const id = req.params.id;
	findById(Number(id))
		.remove(id)
		.then(jobDeleted => {
			if (jobDeleted) {
				res.status(200).json({ message: `Job with ID ${id} deleted.` });
			} else {
				res.status(404).json({ message: `Job with ID ${id} does not exist.` });
			}
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'Job could not be deleted.' });
		});
});

//Update a job
router.put('/job/:id', (req, res) => {
	const updateJob = { ...req.body };
	const id = req.params.id;
	if (updateJob) {
		update(`${id}`, updateJob)
			.then(jobUpdated => {
				if (jobUpdated) {
					return findById(Number(`${id}`)); //change depending on what will be returned by db
				} else {
					res.status(404).json({
						message: `Job with specified ID ${id} is invalid.`,
					});
				}
			})
			.then(updateJob => {
				res.status(200).json(updateJob[0]);
			})
			.catch(error => {
				res.status(500).json({ errorMessage: 'Job could not be updated.' });
			});
	} else {
		res.status(400).json({
			errorMessage:
				'Please provide the following: Category_Tag, Title, Salary, Top_Skills, Familiar_With, Description, Requirements, Active, Degree_Required for a job to be updated.',
		});
	}
});

//-------------USER ENDPOINTS-------------------
//GET all users
router.get('/users', (req,res) => {
	db('users')
	.then(users => res.status(200).json(users))
	.catch(err => res.status(500).json(err))
})

//POST new user
router.post('/users', (req, res) => {
	const user = req.body;

	db('users')
	  .insert(user)
	  .then(ids => {
		res.status(201).json(ids);
	  })
	  .catch(err => {
		res.status(500).json({ message: 'Error inserting user', err });
	  });
})

module.exports = router;
