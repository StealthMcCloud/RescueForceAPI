const { crudControllers } = require("../../utils/crud");
const { Host } = require("./host.model");
const { HOST, SHELTER } = require("../../config").types;
const addFilter = require("../../utils/filter");

const filters = {
  viewHost: (req, res, next) => {
    if (req.userType === HOST) {
      return addFilter({ _id: req.user._id })(req, res, next);
    } else if (req.userType === SHELTER) {
      return addFilter({...req.query.filter})(req, res, next);
    } else {
      res.sendStatus(500);
    }
  }
};

module.exports = { controllers: crudControllers(Host), filters };
