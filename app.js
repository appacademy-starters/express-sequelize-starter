const express = require("express");
const morgan = require("morgan");
const { environment } = require('./config');
const tweetRouter = require("./routes/tweet");
const usersRouter = require('./routes/users');
const cors = require('cors');
const app = express();
const path = require('path');

app.set('views',path.join(__dirname, '/express-apis-frontend/views'));
app.set('view engine','pug');
app.use(cors({ origin: "http://localhost:4000" }));
app.use(morgan("dev"));
app.use(express.json());
app.use('/tweets',tweetRouter);
app.use('/users',usersRouter);
app.get("/", (req, res) => {
  res.send("Welcome to the express-sequelize-starter!");
});

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

// Custom error handlers.

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
