// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");


//Define Engineer class that inherits some properties from the parent Employee class

class Engineer extends Employee {
  constructor(name, id, email, github, department) {
    super(name, id, email, department);
    
    this.github = github;
    this.role = 'Engineer';
  }

  getRole() {
    return this.role;
  }

  getGithub() {
    return this.github;
  }
}

module.exports = Engineer;