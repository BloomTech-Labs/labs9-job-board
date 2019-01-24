const express = require("express");

const db = require("../db/config");
const router = express.Router();

const jobDataTypes = {
  user_uid: "string",
  title: "string",
  salary: "string",
  description: "string",
  active: "boolean",
  college_degree: "boolean",
  top_skills: "string",
  add_skills: "string",
  familiar: "string",
  requirements: "string"
};

// [GET] /api/jobs
// Return all active jobs in database
router.get("", (req, res) => {
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
router.get("/category/:category", (req, res) => {
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

// [GET] /api/jobs/user/:id
// returns all jobs for a user
router.get("/user/:id", (req, res) => {
  const user_uid = req.params.id;

  db("jobs as j")
    .select("j.*")
    .innerJoin("users as u", "j.users_id", "u.id")
    .where({ user_uid })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({ message: "Error retrieving user's jobs" });
    });
});

// [GET] /api/jobs/:id
// Display one job by job id
router.get("/:id", (req, res) => {
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

// [POST] /api/jobs
// Creating a new job
router.post("", (req, res) => {
  const newJob = { ...req.body };
  const insertObject = {};

  if (newJob.title && newJob.salary && newJob.description && newJob.user_uid) {
    db("users")
      .select("id")
      .where({ user_uid: newJob.user_uid })
      .then(response => {
        // response - [{ id: ## }]
        if (response.length) {
          Object.keys(newJob).forEach(key => {
            if (key !== "created_at") {
              if (typeof newJob[key] === jobDataTypes[key]) {
                insertObject[key] = newJob[key];
              }
            }
          });
          insertObject.users_id = response[0].id;
          return db("jobs").insert(insertObject);
        } else {
          throw "id not found";
        }
      })
      .then(response => {
        // response.rowCount
        if (response.rowCount) {
          res.status(201).json({ message: "Successfully created new job" });
        } else {
          res.status(400).json({ message: "Failed to add job" });
        }
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  } else {
    res.status(400).json({ message: "Request not formatted correctly" });
  }
});

// [DELETE] /api/jobs/:id
// Delete a job by job id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  db("jobs")
    .where({ id })
    .del()
    .then(response => {
      if (response) {
        res.status(200).json({ message: "Successfully deleted job" });
      } else {
        res
          .status(400)
          .json({ message: "No job deleted. Verify id is correct." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to delete job" });
    });
});

// [PUT] /api/jobs/:id
// Update a job by job id
router.put("/:id", (req, res) => {
  const updateJob = { ...req.body };
  const id = Number(req.params.id);

  if (!id) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const putObject = {};

  Object.keys(updateJob).forEach(key => {
    if (typeof updateJob[key] === jobDataTypes[key]) {
      if (typeof updateJob[key] === "boolean") {
        putObject[key] = updateJob[key];
      } else if (updateJob[key]) {
        putObject[key] = updateJob[key];
      }
    }
  });

  if (Object.keys(putObject).length) {
    db("jobs")
      .where({ id })
      .update(putObject)
      .then(response => {
        if (response) {
          res.status(200).json({ message: "Successfully updated job" });
        } else {
          res
            .status(400)
            .json({ message: "Failed to update job. Verify id is correct." });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Error updating job" });
      });
  } else {
    res.status(400).json({ message: "No valid updates" });
  }
});

module.exports = router;
