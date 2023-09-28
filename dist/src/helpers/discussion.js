"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discussion = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Discussion {
    constructor(context) {
        console.log("Discussing: " + context + "\n");
        this.context = context;
        this.arguments = [];
    }
    addArgument(body, role, color) {
        let argument = { role, body, color };
        this.printArgument(argument);
        this.arguments.push(argument);
    }
    print() {
        console.log("Discussing: " + this.context + "\n");
        for (let argument of arguments) {
            this.printArgument(argument);
        }
    }
    toString() {
        let discussion = this.context + "/n";
        discussion = discussion + this.getArguments().map((item) => item.role + " : " + item.body).join("/n");
        return discussion;
    }
    printArgument(argument) {
        let message = argument.role + ": " + argument.body;
        const colorMap = {
            red: chalk_1.default.red,
            blue: chalk_1.default.blue,
            green: chalk_1.default.green,
            yellow: chalk_1.default.yellow,
        };
        const colorFunction = colorMap[argument.color] || chalk_1.default.white; // Default to white if color is not found
        console.log(colorFunction(message));
    }
    getArguments() {
        return this.arguments;
    }
    getContext() {
        return this.context;
    }
}
exports.Discussion = Discussion;
