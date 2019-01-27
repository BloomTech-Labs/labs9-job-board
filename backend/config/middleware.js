const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const testRouter = require("../routers/testRouter.js");
const router = require("../routers/router.js");
const authRouter = require("../routers/authRouter.js");
const jobsRouter = require("../routers/jobsRouter.js");
const billingRouter = require("../routers/billingRouter.js");

module.exports = server => {
  // middleware
  server.use(express.json());
  server.use(cors());
  server.use(helmet());

  // express routers
  server.use("/test", testRouter);
  server.use("/api", router);
  server.use("/api/auth", authRouter);
  server.use("/api/jobs", jobsRouter);
  server.use("/api/billing", billingRouter);
};
