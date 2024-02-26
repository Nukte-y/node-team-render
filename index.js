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
        name: "Iemail",
        message: "What is Intern's email adress?"
    },
    {
        type: "input",
        name: "Ischool",
        message: "What school does the Intern attend?"
    }
]

var EmployeeArray =[];

function askQuestions() {
    inquirer.prompt(questions).then( answer => {
        const manager = new Manager(answer.Mname,answer.id,answer.email,answer.office)
        EmployeeArray.push(manager);
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
                const EngineerEmployee = new Engineer(engineerAnswers.Ename,engineerAnswers.Eid,engineerAnswers.Eemail,engineerAnswers.gitHub);
                EmployeeArray.push(EngineerEmployee);
                init(); 
            });
        } else if (answers.role === "Intern") {
            inquirer.prompt(internQuestions).then(internAnswers => {
                const InternEmployee = new Intern(internAnswers.Iname,internAnswers.Iid,internAnswers.Iemail,internAnswers.Ischool);
                EmployeeArray.push(InternEmployee);
                init();
            });
        } else if (answers.role === "Finish building the team") {
            console.log("Building team is finished!");
            fs.writeFile("index.html",render(EmployeeArray),(err) => {
                if (err) throw err;
                console.log("HTML file has been generated!");
                 });
        }
    });    
};

askQuestions();





