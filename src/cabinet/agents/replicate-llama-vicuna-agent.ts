
import { Agent } from "../agent.js"
import ora from 'ora';
import Replicate from "replicate";

export class ReplicateLlamaVicunaAgent extends Agent {

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
                "replicate/vicuna-13b:6282abe6a492de4145d7bb601023762212f9ddbbe78278bd6771c8b3b2f2a13b",
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
