const { fruitsModel } = require("../models");
const { connectionError, response, idGenerator } = require("../utils");

const { Fruits } = fruitsModel;
const { resError, resSuccess } = response;

const getData = (req, res) => {
  const count = res.locals.count;
  const limit = req.query.limit ? parseInt(req.query.limit) : 0;
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;

  const next =
    offset >= 0 && limit > 0
      ? offset + limit >= count
        ? null
        : `${req.protocol}://${req.get("Host")}${req.originalUrl
            .split("?")
            .shift()}?limit=${limit}&offset=${offset + limit}`
      : null;
  const previous =
    offset >= 0 && limit > 0
      ? offset - limit < 0
        ? null
        : `${req.protocol}://${req.get("host")}${req.originalUrl
            .split("?")
            .shift()}?limit=${limit}&offset=${offset - limit}`
      : null;

  Fruits.findAll({
    limit,
    offset,
  })
    .then((results) => {
      if (results.length) {
        const data = results.map((item) => {
          const imageUrl = `${req.protocol}://${req.get("host")}${
            item.dataValues.image_path
          }`;

          delete item.dataValues.image_path;

          return {
            ...item.dataValues,
            image_url: imageUrl,
          };
        });

        resSuccess("Fruits data", 200, data, res, count, next, previous);
      } else {
        resError("Data not found", 404, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

const createData = (req, res) => {
  const params = req.body;

  const payload = {
    id: idGenerator("FRUITS"),
    name: params.name,
    description: params.description,
    image_path: params.imageName ? `/images/fruits/${params.imageName}` : null,
  };

  Fruits.create(payload)
    .then((results) => {
      if (results) {
        resSuccess("Create data success", 201, results, res);
      } else {
        resError("Failed to add fruit", 400, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

module.exports = {
  getData,
  createData,
};
