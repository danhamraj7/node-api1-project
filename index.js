// implement your API here
//imp express
const express = require("express");
//imp database
const Users = require("./data/db.js");

const server = express();
server.use(express.json()); //parse json to the body

server.get("/", (req, res) => {
  res.send({ API: "up and running...." });
});

const port = 4000;
server.listen(port, () => console.log(`\n **API running on ${port}** \n`));
