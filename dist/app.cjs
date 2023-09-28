"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const forum_1 = require("./src/cabinet/forum");
const moderator_1 = require("./src/cabinet/moderator");
function loadForumConfiguration() {
    const configPath = path.join(process.cwd(), '/forum-config.json');
    const forumConfigrationJson = fs.readFileSync(configPath, 'utf-8');
    const forum = JSON.parse(forumConfigrationJson);
    return forum;
}
function loadCredentials() {
    const configPath = path.join(process.cwd(), '/credentials.json');
    const crednetialsJson = fs.readFileSync(configPath, 'utf-8');
    const credentials = JSON.parse(crednetialsJson);
    return credentials;
}
const forumConfig = loadForumConfiguration();
const credentials = loadCredentials();
let agents = (0, forum_1.createAgents)(forumConfig, credentials);
let moderator = new moderator_1.Moderator(forumConfig, credentials);
(0, forum_1.discuss)(moderator, agents, forumConfig);
