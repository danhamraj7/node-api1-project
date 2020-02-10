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

//get
server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log("error on get/users", error);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

//get by id
server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id)

    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

//post
server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Users.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
      });
  }
});

//update

server.put("/api/users/:id", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Users.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: "The user information could not be modified."
        });
      });
  }
});

//destroy
server.delete("/api/users/:id", (req, res) => {
  Users.remove(req.params.id)

    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: "the user was deleted."
        });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })

    .catch(() => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

const port = 4000;
server.listen(port, () => console.log(`\n **API running on ${port}** \n`));
