import { Discussion } from "../helpers/discussion";
import { ChatGptAgent } from "./agents/chat-gpt-agent";
import { ForumConfig } from "../helpers/forum-config";
import { ConclusionStrategy, Engine, HaltingStrategy } from "../helpers/enums";
import { Credentials } from "../helpers/auth";

export const MAX_ARGUMENTS = 10;

export class Moderator {
    roles: string[];
    haltingStrategy: string;
    conclusionStrategy: string;
    agent: ChatGptAgent;
    
    constructor(forumConfig: ForumConfig, credentials: Credentials) {
        
        this.roles = forumConfig.allRoles;
        this.haltingStrategy = forumConfig.moderatorConfig.haltingStrategy;
        this.conclusionStrategy = forumConfig.moderatorConfig.conclusionStrategy;
        this.agent = new ChatGptAgent(forumConfig.moderatorConfig.engine, 'Moderator', forumConfig.allRoles, forumConfig.moderatorConfig.color, credentials)
    }
    
    async electSpeaker(discussion: Discussion) {
        let whoShouldSpeakNow = await this.call(discussion.toString());
        console.log("Moderator: " + whoShouldSpeakNow + " should speak next.");
        let electedRole = this.roles.find(role => role?.toLowerCase() == whoShouldSpeakNow?.toLowerCase());
        if (!electedRole) {
            return this.roles[Math.floor(Math.random() * this.roles.length)];
        }
        return electedRole;
    }
    
    async shouldHalt(discussion: Discussion) {
        if (this.haltingStrategy == HaltingStrategy.MAJORITY_CONSENSUS) {
            let prompt = "answer with YES or NO only - given the following discussion: " + discussion.toString() + "\n================\n" + "Of the following roles: " + this.roles
            + " have they arrived in a majority concencus?"
            let answer = await this.agent.call(prompt);
            if (answer === "YES") {
                return true;
            }
        }
        if (this.haltingStrategy == HaltingStrategy.MAX_ARGUMENTS) {
            if (discussion.getArguments().length > MAX_ARGUMENTS) {
                return true;
            }
        }
        
        if (discussion.getArguments().length > 50) {
            return true;
        }
        return false;
        
        
    }
    
    async conclude(discussion: Discussion) {
        if (this.conclusionStrategy == ConclusionStrategy.NONE) {
            return;
        }
        if (this.conclusionStrategy == ConclusionStrategy.LONG) {
            let prompt = "Summarize the following discussion in length: " + discussion.toString();
            let answer = await this.agent.call(prompt);
            console.log("Moderator: here's the summary of this discussion - \n" + answer);
            return answer;
        }
        if (this.conclusionStrategy == ConclusionStrategy.SHORT) {
            let prompt = "Summarize the following discussion in 3 short points: " + discussion.toString();
            let answer = await this.agent.call(prompt);
            console.log("Moderator: here's the summary of this discussion - \n" + answer);
            return answer;
        }
        
    }
    
    async call(context: string) {
        let prompt = "here is a context: " + context + "\n================\n" + "Of the following roles: " + this.roles
        + " choose one that should speak next given the context. Prefer those who were last referenced or that did not speak yet."
        return await this.agent.call(prompt);
    }
}
