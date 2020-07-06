const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const validate = require("./lib/validate");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const ui = new inquirer.ui.BottomBar();

const render = require("./lib/htmlRenderer");

// Functions to validate user's input
const {
  validateInput,
  validateNumber,
  validateEmail,
} = require("./lib/validate");

const teamRoster = [];

// Main questions that apply to all employees

const employeePrompts = [
  {
    type: "input",
    name: "name",
    message: "Employee's name:",
    validate: validateInput,
  },
  {
    type: "input",
    name: "id",
    message: "Employee's ID number:",
    validate: validateNumber,
  },
  {
    type: "input",
    name: "email",
    message: "Employee's email:",
    validate: validateEmail,
  },
  {
    type: "list",
    name: "role",
    message: "Select employee's role:",
    choices: ["Manager", "Engineer", "Intern"],
  },
];

// Question for Manager
const managerPrompts = [
  {
    type: "input",
    name: "officeNumber",
    message: "Manager's office number:",
    validate: validateNumber,
  },
];

//Question for Engineer
const engineerPrompts = [
  {
    type: "input",
    name: "github",
    message: "Enter employee's github username:",
    validate: validateInput,
  },
];

// Question for intern
const internPrompts = [
  {
    type: "input",
    name: "github",
    message: "Enter intern's school name:",
    validate: validateInput,
  },
];

// Add more users
const addMember = [
  {
    type: "confirm",
    message: "Would you like to add another team member?",
    name: "confirm",
    default: false,
  },
];

let Prompts = async () => {
  ui.log.write(
    "Welcome! Please answer the following questions to create your team. To stop the process at any point, press Ctrl+C"
  );

  try {
    // First display employee prompts
    let employeeResponses = await inquirer.prompt(employeePrompts);

    // Register employee role
    let role = await nextPrompt(employeeResponses);

    //Display next question(s) based on selected employee role
    let roleResponses = await inquirer.prompt(role);

    let employeeInfo = await { ...employeeResponses, ...roleResponses };

    // Assign employeeInfo to the employee variable
    let employee = await buildEmployee(employeeInfo);

    // Push created employee to the team array
    teamRoster.push(employee);

    //Ask if more members should be added

    let promptAddMember = await inquirer.prompt(addMember);

    // Decide wether to add new employee or create the file based on user's response
    renderOrAdMore(promptAddMember.confirm);
  } catch (err) {
    console.log(`Looks like something went wrong! ${err}`);
  }
};

// Build new employee
function buildEmployee(employee) {
  let name = employee.name;
  let id = employee.id;
  let email = employee.email;
  let role = employee.role;

  switch (role) {
    case "Manager":
      return new Manager(name, id, email, employee.officeNumber);
    case "Engineer":
      return new Engineer(name, id, email, employee.gitHub);
    case "Intern":
      return new Intern(name, id, email, employee.school);
    default:
      return `Something went wrong and employee was not created. Please try again.`;
  }
}

// Return the role-specific question(s) based on user's role
function nextPrompt(employee) {
  switch (employee.role) {
    case "Manager":
      return managerPrompts;
    case "Engineer":
      return engineerPrompts;
    case "Intern":
      return internPrompts;
    default:
      return `Something went wrong. Did you select a role?`;
  }
}

// Render HTML file or restart Employee prompts for new user
function renderOrAdMore(confirm) {
  if (confirm) {
    return Prompts();
  }
  renderHTML();
}
// writes the HTML for the output page
function renderHTML() {
  let htmlOutput = render(teamRoster);

  fs.writeFile(outputPath, htmlOutput, (err) => {
    err
      ? console.log(err)
      : console.log("Success! Your employee page has been created.");
  });
}

Prompts();
