const app = require("express")();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user-model");

app.post("/register", async (req, res) => {
  const { pseudo, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const newUser = { pseudo: pseudo, email: email, password: hash };
  const checkPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (checkPassword.test(password)) {
    if (pseudo && email) {
      User.findOne({ email }, (err, user) => {
        if (err) throw err;
        if ([user].length === 0 || user === null) {
          // si email === null, il y a effectivement aucun user vu que le type est null
          User.create(newUser, (err, res) => {
            if (err) console.log(err);
          });

          return res.status(200).send("user register with success");
        } else {
          return res.status(400).send("email already exist");
        }
      });
    } else {
      return res.status(412).send("pseudo and email are required");
    }
  } else {
    return res
      .status(412)
      .send(
        "Your password minimum eight characters, at least one letter and one number"
      );
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    User.findOne({ email }, (err, user) => {
      try {
        bcrypt.compare(password, user.password).then(response => {
          if (user.email === email && response) {
            const userToken = jwt.sign({ email }, "Javascript is awesome", {
              expiresIn: "1h"
            });
            return res.status(200).send({
              userName: user.pseudo,
              userToken
            });
          } else {
            return res.status(400).send("invalid password");
          }
        });
      } catch (error) {
        return res.status(400).send("user does exist");
      }
    });
  } else {
    res.status(412).send("email and password are required fields");
  }
});

module.exports = app;
