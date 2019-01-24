const express = require("express");

const db = require("../db/config");
const router = express.Router();

//-------------JOB ENDPOINTS-------------------
// TODO: Need to display a list of all jobs (Get) and Get only one job -- ONCE COMPLETE DELETE THIS TODO

// TODO: Test routes -- ONCE COMPLETE DELETE THIS TODO

// [GET] /api/jobs
// Return all active jobs in database
router.get("/jobs", (req, res) => {
  db("jobs as j")
    .innerJoin("users as u", "j.users_id", "u.id")
    .select(
      "j.*",
      "u.company_name",
      "u.summary",
      "u.application_method",
      "u.avatar_image"
    )
    .where({ active: true })
    .then(allJobs => {
      if (allJobs.length) {
        res.status(200).json(allJobs);
      } else {
        res.status(200).json({ message: "No active jobs in database" });
      }
    })
    .catch(error => {
      res.status(501).json({
        errorMessage: "The jobs information could not be retrieved.",
        error: error
      });
    });
});

// [GET] /api/jobs/category/:category
// returns all jobs with provided category
router.get("/jobs/category/:category", (req, res) => {
  const { category } = req.params;

  db("jobs as j")
    .innerJoin("users as u", "j.users_id", "u.id")
    .select(
      "j.*",
      "u.company_name",
      "u.summary",
      "u.application_method",
      "u.avatar_image"
    )
    .where({ active: true, category })
    .then(filteredJobs => {
      if (filteredJobs.length) {
        res.status(200).json(filteredJobs);
      } else {
        res.status(200).json({ message: "No active jobs in category" });
      }
    })
    .catch(error => {
      res.status(501).json({
        errorMessage: "The jobs information could not be retrieved.",
        error: error
      });
    });
});

// Display one job
router.get("/jobs/:id", (req, res) => {
  const { id } = req.params;

  db("jobs as j")
    .innerJoin("users as u", "j.users_id", "u.id")
    .select(
      "j.*",
      "u.company_name",
      "u.summary",
      "u.application_method",
      "u.avatar_image"
    )
    .where({ "j.id": id })
    .then(job => {
      if (job.length) {
        res.status(200).json(job);
      } else {
        res.status(404).json({
          errorMessage: "The job with the specified ID does not exist.",
          error: error
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "The job information could not be retrieved.",
        error: error
      });
    });
});

// Creating a new job
router.post("/job", (req, res) => {
  const newJob = { ...req.body };

  if (newJob) {
    db("jobs");
    insert(newJob)
      .then(addJob => {
        res.status(201).json(addJob[0]);
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: "There was an error adding your job to the database.",
          error: error
        });
      });
  } else {
    res.status(400).json({
      errorMessage:
        "Please provide the following: Category_Tag, Title, Salary, Top_Skills, Familiar_With, Description, Requirements, Active, Degree_Required for a job to be added."
    });
  }
});

// Delete a job
router.delete("/job/:id", (req, res) => {
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
      res.status(500).json({
        errorMessage: "Job could not be deleted.",
        error: error
      });
    });
});

// Update a job
router.put("/job/:id", (req, res) => {
  const updateJob = { ...req.body };
  const id = req.params.id;
  if (updateJob) {
    update(`${id}`, updateJob)
      .then(jobUpdated => {
        if (jobUpdated) {
          return findById(Number(`${id}`)); //change depending on what will be returned by db
        } else {
          res.status(404).json({
            message: `Job with specified ID ${id} is invalid.`
          });
        }
      })
      .then(updateJob => {
        res.status(200).json(updateJob[0]);
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: "Job could not be updated.",
          error: error
        });
      });
  } else {
    res.status(400).json({
      errorMessage:
        "Please provide the following: Category_Tag, Title, Salary, Top_Skills, Familiar_With, Description, Requirements, Active, Degree_Required for a job to be updated."
    });
  }
});

//-------------USER ENDPOINTS-------------------
//GET all users
router.get("/users", (req, res) => {
  db("users")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(501).json(err);
    });
});

//POST new user
router.post("/users", (req, res) => {
  const user = req.body;

  db("users")
    .insert(user)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: "Error inserting user", err });
    });
});

//GET user by id
router.get("/users/:id", (req, res) => {
  const { id } = req.params;

  db("users")
    .where({ id: id })
    .first()
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "A user with that ID was not found." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error getting the user.", err });
    });
});

//UPDATE user
router.put("/user", (req, res) => {
  const changes = req.body;
  const user_uid = changes.user_uid;
  db("users")
    .where({ user_uid })
    .update(changes)
    .then(count => {
      if (count === 0) {
        res
          .status(404)
          .json({ message: "A user with that ID does not exist." });
      } else {
        res.status(201).json(changes);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error editing the user.", err });
    });
});

router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db("users")
    .where({ id: id })
    .del()
    .then(count => {
      if (count === 0) {
        res
          .status(404)
          .json({ message: "A user with that ID does not exist." });
      } else {
        res
          .status(200)
          .json({ message: "deleted the following amount of users:", count });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error deleting the user.", err });
    });
});

router.get("/company/:user_uid", (req, res) => {
  const post = req.params;
  const user_uid = post.user_uid;
  console.log(req.params);
  db("users")
    .where({ user_uid })
    .first()
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ errorMessage: `nope` });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: `something is wrong`
      });
    });
});

module.exports = router;
