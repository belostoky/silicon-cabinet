"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HumanPoweredAgent = void 0;
const agent_js_1 = require("../agent.js");
const inquirer_1 = __importDefault(require("inquirer"));
class HumanPoweredAgent extends agent_js_1.Agent {
    async call() {
        let answers = await inquirer_1.default.prompt([{ name: this.role, message: "" + this.role + ":" }]);
        return answers[this.role];
    }
}
exports.HumanPoweredAgent = HumanPoweredAgent;
