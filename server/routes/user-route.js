const app = require("express")();
const bcrypt = require("bcrypt");
const User = require("../models/user-model");

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const newUser = { email: email, password: hash };

  // Todo mettre une condition regex pour un mot de passe credible
  // Todo ajout de jsonwebtoken

  if (email && password) {
    User.findOne({ email }, (err, user) => {
      if (err) throw err;
      if ([user].length === 0 || user === null) {
        // si email === null, il y a effectivement aucun user avec ce mail
        User.create(newUser, (err, res) => {
          if (err) console.log(err);
        });

        return res.status(200).send("user register with success");
      } else {
        return res.status(400).send("email already exist");
      }
    });
  } else {
    return res.status(412).send("email and password are required fields");
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    User.findOne({ email }, (err, user) => {
      // je cherche par le mail car il est unique
      try {
        bcrypt.compare(password, user.password).then(response => {
          if (user.email === email && response) {
            return res.status(200).send("connected");
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
