const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const Employee = require("./lib/Employee.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const questions = [
    {
        type: "input",
        name: "Mname",
        message: "What is your name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your Employee ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email adress?"
    },
    {
        type: "input",
        name: "office",
        message: "What is your office number?"
    },
]

const engineerQuestions = [
     {
        type: "input",
        name: "Ename",
        message: "What is Engineer's name?"
    },
    {
        type: "input",
        name: "Eid",
        message: "What is Engineer's employee ID?"
    },
    {
        type: "input",
        name: "Eemail",
        message: "What is Engineer's email adress?"
    },
    {
        type: "input",
        name: "github",
        message: "What is Engineer's GitHub username?"
    }

]

const internQuestions = [
    {
        type: "input",
        name: "Iname",
        message: "What is Intern's name?"
    },
    {
        type: "input",
        name: "Iid",
        message: "What is Intern's employee ID?"
    },
    {
        type: "input",
        name: "Eemail",
        message: "What is Intern's email adress?"
    },
    {
        type: "input",
        name: "Eemail",
        message: "What school does the Intern attend?"
    }
]


function askQuestions() {
    inquirer.prompt(questions).then( answer => {
        const manager = new Employee(answer.name,answer.id,answer.email,"Manager")
        init();
    })
}

// function to initialize the program
function init() {
    inquirer.prompt( {
        type: "list",
        name: "role",
        message: "What role do you want to add?",
        choices: ["Engineer","Intern","Finish building the team"]
    })
    .then(answers => {
        if (answers.role === "Engineer") {
            inquirer.prompt(engineerQuestions).then(engineerAnswers => { 
                createEmployee(engineerAnswers);
                init(); 
            });
        } else if (answers.role === "Intern") {
            inquirer.prompt(internQuestions).then(internAnswers => {
                createEmployee(internAnswers);
                init(); 
            });
        } else if (answers.role === "Finish building the team") {
            console.log("Building team is finished!");
        }
    });    
 };
askQuestions();

function createEmployee(answer){
    const newEmployee = new Employee(answer.name,answer.id,answer.email,answer.role);
    return newEmployee;
}

