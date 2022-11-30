const { fruitsModel } = require("../models");
const { connectionError } = require("../utils");

const { Fruits } = fruitsModel;

const countData = (req, res, next) => {
  Fruits.count()
    .then((results) => {
      res.locals.count = results;
      next();
    })
    .catch((error) => connectionError(error, res));
};

module.exports = {
  countData,
};
