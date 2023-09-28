import { ChatGptAgent } from './agents/chat-gpt-agent.js';
import { ChatGptThreeAgent } from './agents/chat-gpt-three-agent.js';
import { ReplicateLlama270bAgent } from './agents/replicate-llama-2-70b-agent.js';
import { ReplicateLlamaVicunaAgent } from './agents/replicate-llama-vicuna-agent.js';
import { Discussion } from '../helpers/discussion.js';
import { HumanPoweredAgent } from './agents/human-powered-agent.js';
import { ForumConfig, SpeakerConfig } from '../helpers/forum-config.js';
import { Engine } from '../helpers/enums.js';
import { Agent } from './agent.js';
import { Moderator } from './moderator.js';
import { Credentials } from '../helpers/auth.js';

function createAgent(engine: Engine, role: string, otherRoles: string[], color: string, credentials: Credentials): Agent {
    switch (engine) {
        case Engine.HUMAN_POWERED:
            return new HumanPoweredAgent(engine, role, otherRoles, color, credentials);
        case Engine.CHAT_GPT:
            return new ChatGptAgent(engine, role, otherRoles, color, credentials);
        case Engine.CHAT_GPT_THREE:
            return new ChatGptThreeAgent(engine, role, otherRoles, color, credentials);
        case Engine.REPLICATE__LLAMA_2_70B:
            return new ReplicateLlama270bAgent(engine, role, otherRoles, color, credentials);
        case Engine.REPLICATE__LLAMA_VICUNA:
            return new ReplicateLlamaVicunaAgent(engine, role, otherRoles, color, credentials);
        default:
            return new ChatGptAgent(engine, role, otherRoles, color, credentials);
    }
}

export function createAgents(forumConfig: ForumConfig, credentials: Credentials): Agent[] {
    const speakerConfigs: SpeakerConfig[] = forumConfig.speakerConfigs
    const allRoles: string[] = forumConfig.allRoles
    
    let agents: Agent[] = [];
    for (const speakerConfig of speakerConfigs) {
        const agent = createAgent(speakerConfig.engine, allRoles[speakerConfig.roleIndex], allRoles, speakerConfig.color, credentials)
        agents.push(agent)
    }

    return agents
}

export async function discuss(moderator: Moderator, agents: Agent[], forumConfig: ForumConfig): Promise<void> {
    let discussion = new Discussion(forumConfig.context);
    let nextSpeaker: Agent | undefined = agents[Math.floor(Math.random() * forumConfig.allRoles.length)];
    let shouldModeratorHalt: boolean = false;
    while (!shouldModeratorHalt && nextSpeaker) {
        let argument = await nextSpeaker.call(discussion.toString());
        if (argument){
            discussion.addArgument(argument, nextSpeaker.role, nextSpeaker.color);
            let nextRoleToSpeak = await moderator.electSpeaker(discussion);
            nextSpeaker = agents.find(agent => agent.role.toLowerCase() == nextRoleToSpeak.toLowerCase());
            shouldModeratorHalt = await moderator.shouldHalt(discussion);
        }
    }
    console.log("\n================================================================\n")
    moderator.conclude(discussion);
}

