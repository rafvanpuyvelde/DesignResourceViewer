import express from "express";
import bodyParser from "body-parser";
import router from "./routes/router";

// Configuration
const port = 5000;
const app = express();

// Setup - General
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use(router);

// Startup
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
