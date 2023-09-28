import { ConclusionStrategy, Engine, HaltingStrategy, SpeakerType } from "./enums";

export class ForumConfig {
    context!: string;
    speakerConfigs!: SpeakerConfig[];
    allRoles!: string[];
    moderatorConfig!: ModeratorConfig;
}

export interface SpeakerConfig {
    type: SpeakerType
    engine: Engine;
    roleIndex: number;
    color: string;
    conflictResolution?: string;
    dataDrive?: string;
}

export interface ModeratorConfig {
    engine: Engine;
    haltingStrategy: HaltingStrategy
    conclusionStrategy: ConclusionStrategy;
    color: string;
}
