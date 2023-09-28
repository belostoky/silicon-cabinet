import { ConclusionStrategy, Engine, HaltingStrategy, SpeakerType } from "./enums";

export class Credentials {
    openAi!: KeyValue;
    replicate!: KeyValue;
}

interface KeyValue {
    key: string
}
  