import { Agent } from "../agent.js"
import ora from "ora";
import OpenAI from "openai";

export class ChatGptAgent extends Agent {

    apiClient = new OpenAI({
        apiKey: this.credentials.openAi.key
    });

    createRoleAndContextPrompt(context: string) {
        return "Act as a " + this.role + " and answer as if you are " + this.role + " without any introductions except your answer - 2-3 sentences. "
            + "These are the other roles participating in the discussion, you can reference, answer, ask a question, agree or disagree with them: " + this.roles.join(",") + "."
            + "This is the discussion context: " + context;
    }

    async call(prompt: string) {
        let roleAndContextPrompt = this.createRoleAndContextPrompt(prompt);

        const spinner = ora({ spinner: 'pipe' }).start();
        try {
            const completion = await this.apiClient.chat.completions.create({
                model: 'gpt-4',
                messages: [{ role: "user", content: roleAndContextPrompt }],
            });
            spinner.stop();
            spinner.clear();
            return completion.choices[0].message.content;
        } catch (error: any) {
            spinner.stop();
            spinner.clear();
            return "Error: " + error.message;
        }        
    }
}
