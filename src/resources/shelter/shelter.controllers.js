const { crudControllers } = require("../../utils/crud");
const { Shelter } = require("./shelter.model");

module.exports = crudControllers(Shelter);
