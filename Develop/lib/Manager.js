// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber, department) {
    super(name, id, email, department);
    
    this.officeNumber = officeNumber;
    this.role = 'Manager';
  }

  getRole() {
    return this.role;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }
}

// Manager.prototype.getOfficeNumber = function() {
// return this.officeNumber;
// }
// Manager.prototype.getRole = function() {
//     return this.role;
// }

module.exports = Manager;