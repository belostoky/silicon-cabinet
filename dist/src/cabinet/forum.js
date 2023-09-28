"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discuss = exports.createAgents = void 0;
const chat_gpt_agent_js_1 = require("./agents/chat-gpt-agent.js");
const chat_gpt_three_agent_js_1 = require("./agents/chat-gpt-three-agent.js");
const replicate_llama_2_70b_agent_js_1 = require("./agents/replicate-llama-2-70b-agent.js");
const replicate_llama_vicuna_agent_js_1 = require("./agents/replicate-llama-vicuna-agent.js");
const discussion_js_1 = require("../helpers/discussion.js");
const human_powered_agent_js_1 = require("./agents/human-powered-agent.js");
const enums_js_1 = require("../helpers/enums.js");
function createAgent(engine, role, otherRoles, color, credentials) {
    switch (engine) {
        case enums_js_1.Engine.HUMAN_POWERED:
            return new human_powered_agent_js_1.HumanPoweredAgent(engine, role, otherRoles, color, credentials);
        case enums_js_1.Engine.CHAT_GPT:
            return new chat_gpt_agent_js_1.ChatGptAgent(engine, role, otherRoles, color, credentials);
        case enums_js_1.Engine.CHAT_GPT_THREE:
            return new chat_gpt_three_agent_js_1.ChatGptThreeAgent(engine, role, otherRoles, color, credentials);
        case enums_js_1.Engine.REPLICATE__LLAMA_2_70B:
            return new replicate_llama_2_70b_agent_js_1.ReplicateLlama270bAgent(engine, role, otherRoles, color, credentials);
        case enums_js_1.Engine.REPLICATE__LLAMA_VICUNA:
            return new replicate_llama_vicuna_agent_js_1.ReplicateLlamaVicunaAgent(engine, role, otherRoles, color, credentials);
        default:
            return new chat_gpt_agent_js_1.ChatGptAgent(engine, role, otherRoles, color, credentials);
    }
}
function createAgents(forumConfig, credentials) {
    const speakerConfigs = forumConfig.speakerConfigs;
    const allRoles = forumConfig.allRoles;
    let agents = [];
    for (const speakerConfig of speakerConfigs) {
        const agent = createAgent(speakerConfig.engine, allRoles[speakerConfig.roleIndex], allRoles, speakerConfig.color, credentials);
        agents.push(agent);
    }
    return agents;
}
exports.createAgents = createAgents;
async function discuss(moderator, agents, forumConfig) {
    let discussion = new discussion_js_1.Discussion(forumConfig.context);
    let nextSpeaker = agents[Math.floor(Math.random() * forumConfig.allRoles.length)];
    let shouldModeratorHalt = false;
    while (!shouldModeratorHalt && nextSpeaker) {
        let argument = await nextSpeaker.call(discussion.toString());
        if (argument) {
            discussion.addArgument(argument, nextSpeaker.role, nextSpeaker.color);
            let nextRoleToSpeak = await moderator.electSpeaker(discussion);
            nextSpeaker = agents.find(agent => agent.role.toLowerCase() == nextRoleToSpeak.toLowerCase());
            shouldModeratorHalt = await moderator.shouldHalt(discussion);
        }
    }
    console.log("\n================================================================\n");
    moderator.conclude(discussion);
}
exports.discuss = discuss;
