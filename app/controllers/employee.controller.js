const Employee = require("../models/employee.model.js");

// Create and Save a new Employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Employee
  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    employeeName: req.body.employeeName,
    doj: req.body.doj,
    dob: req.body.dob,
    age: req.body.age,
    profilePic:req.body.file
  });

  // Save employee in the database
  Employee.create(employee, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    else res.send(data);
  });
};

// Retrieve all Employees from the database.
exports.findAll = (req, res) => {
  Employee.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employees."
      });
    else res.send(data);
  });
};

// Retrieve all Employees from the database.
exports.findName = (req, res) => {
  Employee.getName(req.query.employeeName,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employees."
      });
    else res.send(data);
  });
};


// Find a single Employee with a EmployeeId
exports.findOne = (req, res) => {
  Employee.findById(req.params.employeeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.employeeId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with id " + req.params.employeeId
        });
      }
    } else res.send(data);
  });
};

// Update a Employee identified by the EmployeeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Employee.updateById(
    req.params.employeeId,
    new Employee(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with id ${req.params.employeeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Employee with id " + req.params.employeeId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Employee with the specified EmployeeId in the request
exports.delete = (req, res) => {
  Employee.remove(req.params.employeeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.employeeId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Employee with id " + req.params.employeeId
        });
      }
    } else res.send({ message: `Employee was deleted successfully!` });
  });
};


