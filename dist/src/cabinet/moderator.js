"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moderator = exports.MAX_ARGUMENTS = void 0;
const chat_gpt_agent_1 = require("./agents/chat-gpt-agent");
const enums_1 = require("../helpers/enums");
exports.MAX_ARGUMENTS = 10;
class Moderator {
    constructor(forumConfig, credentials) {
        this.roles = forumConfig.allRoles;
        this.haltingStrategy = forumConfig.moderatorConfig.haltingStrategy;
        this.conclusionStrategy = forumConfig.moderatorConfig.conclusionStrategy;
        this.agent = new chat_gpt_agent_1.ChatGptAgent(forumConfig.moderatorConfig.engine, 'Moderator', forumConfig.allRoles, forumConfig.moderatorConfig.color, credentials);
    }
    async electSpeaker(discussion) {
        let whoShouldSpeakNow = await this.call(discussion.toString());
        console.log("Moderator: " + whoShouldSpeakNow + " should speak next.");
        let electedRole = this.roles.find(role => (role === null || role === void 0 ? void 0 : role.toLowerCase()) == (whoShouldSpeakNow === null || whoShouldSpeakNow === void 0 ? void 0 : whoShouldSpeakNow.toLowerCase()));
        if (!electedRole) {
            return this.roles[Math.floor(Math.random() * this.roles.length)];
        }
        return electedRole;
    }
    async shouldHalt(discussion) {
        if (this.haltingStrategy == enums_1.HaltingStrategy.MAJORITY_CONSENSUS) {
            let prompt = "answer with YES or NO only - given the following discussion: " + discussion.toString() + "\n================\n" + "Of the following roles: " + this.roles
                + " have they arrived in a majority concencus?";
            let answer = await this.agent.call(prompt);
            if (answer === "YES") {
                return true;
            }
        }
        if (this.haltingStrategy == enums_1.HaltingStrategy.MAX_ARGUMENTS) {
            if (discussion.getArguments().length > exports.MAX_ARGUMENTS) {
                return true;
            }
        }
        if (discussion.getArguments().length > 50) {
            return true;
        }
        return false;
    }
    async conclude(discussion) {
        if (this.conclusionStrategy == enums_1.ConclusionStrategy.NONE) {
            return;
        }
        if (this.conclusionStrategy == enums_1.ConclusionStrategy.LONG) {
            let prompt = "Summarize the following discussion in length: " + discussion.toString();
            let answer = await this.agent.call(prompt);
            console.log("Moderator: here's the summary of this discussion - \n" + answer);
            return answer;
        }
        if (this.conclusionStrategy == enums_1.ConclusionStrategy.SHORT) {
            let prompt = "Summarize the following discussion in 3 short points: " + discussion.toString();
            let answer = await this.agent.call(prompt);
            console.log("Moderator: here's the summary of this discussion - \n" + answer);
            return answer;
        }
    }
    async call(context) {
        let prompt = "here is a context: " + context + "\n================\n" + "Of the following roles: " + this.roles
            + " choose one that should speak next given the context. Prefer those who were last referenced or that did not speak yet.";
        return await this.agent.call(prompt);
    }
}
exports.Moderator = Moderator;
