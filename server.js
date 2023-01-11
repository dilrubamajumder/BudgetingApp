require("dotenv").config();

const PORT = process.env.PORT || 8000;

const express = require("express");
const server = express();
const morgan = require("morgan");
const cors = require("cors");
const budgetsController = require('./controllers/budgetsController')

server.use(express.json()); 
server.use(cors())
server.use(morgan("tiny"));
server.use("/budgets", budgetsController);


server.get("/", (req, res) => {
    res.json({test: 'hello'});
});

server.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
  });

server.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`)
  })