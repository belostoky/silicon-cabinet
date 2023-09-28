"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplicateLlama270bAgent = void 0;
const agent_js_1 = require("../agent.js");
const replicate_1 = __importDefault(require("replicate"));
const ora_1 = __importDefault(require("ora"));
class ReplicateLlama270bAgent extends agent_js_1.Agent {
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
            const output = await this.apiClient.run("replicate/llama-2-70b-chat:2796ee9483c3fd7aa2e171d38f4ca12251a30609463dcfd4cd76703f22e96cdf", {
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
exports.ReplicateLlama270bAgent = ReplicateLlama270bAgent;
