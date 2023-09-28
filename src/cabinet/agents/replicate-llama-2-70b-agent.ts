
import { Agent } from "../agent.js"
import Replicate from "replicate";
import ora from 'ora';

export class ReplicateLlama270bAgent extends Agent {

    apiClient = new Replicate({
        auth: this.credentials.replicate.key
    });

    createSystemPrompt() {
        return "Act as a " + this.role + " and answer as if you are " + this.role + " without any introductions except your answer. "
            + "These are the other roles participating in the discussion, you can reference, answer, ask a question, agree or disagree with them: " + this.roles.join(",") + "."
    }
    createPrompt(context: string) {
        return "This is the discussion context: " + context;
    }

    async call(prompt: string) {

        let systemPrompt = this.createSystemPrompt();
        let context = this.createPrompt(prompt);

        const spinner = ora({ spinner: 'pipe' }).start();
        try {
            const output = await this.apiClient.run(
                "replicate/llama-2-70b-chat:2796ee9483c3fd7aa2e171d38f4ca12251a30609463dcfd4cd76703f22e96cdf",
                {
                    input: {
                        prompt: context,
                        system_prompt: systemPrompt,
                        max_new_tokens: 10000
                    }
                }
            );
            spinner.stop();
            spinner.clear();
            return output.toString();
        } catch (error: any) {
            spinner.stop();
            spinner.clear();
            return "Error: " + error.message;
        }
    }
}
