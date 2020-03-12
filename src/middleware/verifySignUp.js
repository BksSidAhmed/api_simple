const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateMatricule = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      matricule: req.body.matricule
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }
    next();
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateMatricule: checkDuplicateMatricule,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;