// TODO: Write code to define and export the Engineer class.
//  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee{
    constructor (name, id, email,gitHub){
        super(name, id, email);
        this.role = "Engineer";
        this.github = gitHub;
    }
    getGithub() {
        return this.github;
    }
    getRole(){
        return this.role;
    }
}

module.exports = Engineer;