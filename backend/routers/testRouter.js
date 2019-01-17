const express = require("express");

const db = require("../db/config");

const router = express.Router();

// [GET] /test
// testing for server running
router.get("/", (req, res) => {
  res.status(200).json({ server: "running" });
});

router.get("/job/:id", (req, res) => {
  const { id } = req.params;
  db("jobs")
    .where({ id })
    .first()
    .then(job => {
      if (job) {
        db("users")
          .where({ id })
          .first()
          .select(
            "first_name",
            "last_name",
            "email",
            "company_name",
            "summary",
            "application_method",
            "avatar_image",
            "balance",
            "created_at",
            "updated_at"
          )
          .then(user => {
            job.user = user;
            res.status(200).json(job);
          });
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

module.exports = router;
