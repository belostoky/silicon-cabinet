"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGptThreeAgent = void 0;
const agent_js_1 = require("../agent.js");
const ora_1 = __importDefault(require("ora"));
const openai_1 = __importDefault(require("openai"));
class ChatGptThreeAgent extends agent_js_1.Agent {
    constructor() {
        super(...arguments);
        this.apiClient = new openai_1.default({
            apiKey: this.credentials.openAi.key
        });
    }
    createRoleAndContextPrompt(context) {
        return "Act as a " + this.role + " and answer as if you are " + this.role + " without any introductions except your answer - 2-3 sentences. "
            + "These are the other roles participating in the discussion, you can reference, answer, ask a question, agree or disagree with them: " + this.roles.join(",") + "."
            + "This is the discussion context: " + context;
    }
    async call(prompt) {
        let roleAndContextPrompt = this.createRoleAndContextPrompt(prompt);
        const spinner = (0, ora_1.default)({ spinner: 'pipe' }).start();
        try {
            const completion = await this.apiClient.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: "user", content: roleAndContextPrompt }],
            });
            spinner.stop();
            spinner.clear();
            return completion.choices[0].message.content;
        }
        catch (error) {
            spinner.stop();
            spinner.clear();
            return "Error: " + error.message;
        }
    }
}
exports.ChatGptThreeAgent = ChatGptThreeAgent;
