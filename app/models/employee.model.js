const sql = require("./db.js");

// constructor
const Employee = function (employee) {
  this.first_name = employee.firstName;
  this.last_name = employee.lastName;
  this.employee_name = employee.employeeName;
  this.age = employee.age;
  this.doj = employee.doj;
  this.dob = employee.dob;
  this.profile_pic=employee.profilePic;
};

Employee.create = (newEmployee, result) => {
  sql.query("INSERT INTO employee_details SET ?", newEmployee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    //console.log("created employee: ", { id: res.insertId, ...newEmployee });
    result(null, { id: res.insertId, ...newEmployee });
  });
};

Employee.findById = (employeeId, result) => {
  sql.query(`SELECT employee_id employeeId,first_name firstName, 
  last_name lastName, employee_name employeeName, age ,DATE_FORMAT(doj, '%m-%d-%Y') doj,DATE_FORMAT(dob, '%m-%d-%Y') dob,profile_pic profilePic  FROM employee_details WHERE employee_id = ${employeeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee_details: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Employee with the id
    result({ kind: "not_found" }, null);
  });
};

Employee.getAll = result => {
  sql.query(`SELECT employee_id employeeId,first_name firstName, 
  last_name lastName, employee_name employeeName, age ,DATE_FORMAT(doj, '%m-%d-%Y') doj,DATE_FORMAT(dob, '%m-%d-%Y') dob, profile_pic profilePic FROM employee_details`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employee_details: ", res);
    result(null, res);
  });
};

Employee.updateById = (id, employee, result) => {
  sql.query(
    "UPDATE employee_details SET first_name = ?, last_name = ?,employee_name = ?,age =? ,doj =? ,dob = ? WHERE employee_id = ?",
    [
      employee.first_name,
      employee.last_name,
      employee.employee_name,
      employee.age,
      new Date(employee.doj),
      new Date(employee.dob),
      id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Employee with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee_details: ", { id: id, ...employee });
      result(null, { id: id, ...employee });
    }
  );
};

Employee.remove = (id, result) => {
  sql.query("DELETE FROM employee_details WHERE employee_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Employee with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee_details with id: ", id);
    result(null, res);
  });
};

Employee.removeAll = result => {
  sql.query("DELETE FROM employee_details", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} employees`);
    result(null, res);
  });
};

module.exports = Employee;
