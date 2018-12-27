const { crudControllers } = require("../../utils/crud");
const { Animal } = require("./animal.model");

module.exports = crudControllers(Animal);
