
import * as fs from 'fs';
import * as path from 'path';
import { Credentials } from './src/helpers/auth';
import { ForumConfig } from './src/helpers/forum-config';
import { createAgents, discuss } from './src/cabinet/forum';
import { Moderator } from './src/cabinet/moderator';


function loadForumConfiguration(): ForumConfig {
    const configPath: string = path.join(process.cwd(), '/forum-config.json');
    const forumConfigrationJson: string = fs.readFileSync(configPath, 'utf-8');
    const forum: ForumConfig = JSON.parse(forumConfigrationJson) as ForumConfig;
    return forum;
}

function loadCredentials(): Credentials {
    const configPath: string = path.join(process.cwd(), '/credentials.json');
    const crednetialsJson: string = fs.readFileSync(configPath, 'utf-8');
    const credentials: Credentials = JSON.parse(crednetialsJson) as Credentials;
    return credentials;
}

const forumConfig: ForumConfig = loadForumConfiguration();
const credentials: Credentials = loadCredentials();

let agents = createAgents(forumConfig, credentials);
let moderator = new Moderator(forumConfig, credentials)

discuss(moderator, agents, forumConfig);