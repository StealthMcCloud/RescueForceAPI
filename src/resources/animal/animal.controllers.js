const { crudControllers } = require("../../utils/crud");
const { Animal } = require("./animal.model");
const { DEFAULT, HOST, SHELTER } = require("../../config").types;
const addFilter = require("../../utils/filter");

const filters = {
  viewAnimals: (req, res, next) => {
    const filter =  req.query.filter ? JSON.parse(req.query.filter) : {};
    if (req.userType === DEFAULT) {
      return addFilter({ ...filter, status: "adoptable" })(req, res, next);
    } else if (req.userType === HOST) {
      return addFilter({ ...filter, status: "need-foster" })(req, res, next);
    } else if (req.userType === SHELTER) {
      return addFilter({ ...filter })(req, res, next);
    } else {
      res.sendStatus(500);
    }
  },
  viewAnimal: (req, res, next) => {
    if (req.userType === DEFAULT) {
      return addFilter({ status: "adoptable" })(req, res, next);
    } else if (req.userType === HOST) {
      return addFilter({
        $or: [{ status: "need-foster" }, { hostId: req.user._id }]
      })(req, res, next);
    } else if (req.userType === SHELTER) {
      return addFilter({})(req, res, next);
    } else {
      res.sendStatus(500);
    }
  }
};

module.exports = { controllers: crudControllers(Animal), filters };
