module.exports = app => {
  const employees = require("../controllers/employee.controller.js");

  // Create a new Employees
  app.post("/employees", employees.create);

  // Retrieve all Employees
  app.get("/employees", employees.findAll);

  // Retrieve a single Employee with employeeId
  app.get("/employees/:employeeId", employees.findOne);

  // Update a Employees with employeeId
  app.put("/employees/:employeeId", employees.update);

  // Delete a Employees with employeeId
  app.delete("/employees/:employeeId", employees.delete);

};
