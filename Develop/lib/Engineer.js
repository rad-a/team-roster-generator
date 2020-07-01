// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");


//Define Engineer class that inherits some properties from the parent Employee class

class Engineer extends Employee {
    constructor(name, email, id, department, github) {
        super(name, email, id, department);
        this.github = github;
    
    }
retRole() 
}