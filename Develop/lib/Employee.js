// TODO: Write code to define and export the Employee class

// Define Employee class

class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = "Employee";
    // this.department = department;
  }

  //Get properties for Employee
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return this.role;
  }
//   getDepartment() {
//     return this.department;
//   }
}

//Make Employee accessible to child classes
module.exports = Employee;
