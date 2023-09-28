"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplicateLlamaVicunaAgent = void 0;
const agent_js_1 = require("../agent.js");
const ora_1 = __importDefault(require("ora"));
const replicate_1 = __importDefault(require("replicate"));
class ReplicateLlamaVicunaAgent extends agent_js_1.Agent {
    constructor() {
        super(...arguments);
        this.apiClient = new replicate_1.default({
            auth: this.credentials.replicate.key
        });
    }
    createSystemPrompt() {
        return "Act as a " + this.role + " and answer as if you are " + this.role + " without any introductions except your answer. "
            + "These are the other roles participating in the discussion, you can reference, answer, ask a question, agree or disagree with them: " + this.roles.join(",") + ".";
    }
    createPrompt(context) {
        return "This is the discussion context: " + context;
    }
    async call(prompt) {
        let systemPrompt = this.createSystemPrompt();
        let context = this.createPrompt(prompt);
        const spinner = (0, ora_1.default)({ spinner: 'pipe' }).start();
        try {
            const output = await this.apiClient.run("replicate/vicuna-13b:6282abe6a492de4145d7bb601023762212f9ddbbe78278bd6771c8b3b2f2a13b", {
                input: {
                    prompt: context,
                    system_prompt: systemPrompt,
                    max_new_tokens: 10000
                }
            });
            spinner.stop();
            spinner.clear();
            return output.toString();
        }
        catch (error) {
            spinner.stop();
            spinner.clear();
            return "Error: " + error.message;
        }
    }
}
exports.ReplicateLlamaVicunaAgent = ReplicateLlamaVicunaAgent;
