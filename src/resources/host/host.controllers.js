const { crudControllers } = require("../../utils/crud");
const { Host } = require("./host.model");

module.exports = crudControllers(Host);
