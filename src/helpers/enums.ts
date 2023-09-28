

export enum HaltingStrategy {
    MAJORITY_CONSENSUS = "Consensus",
    MAX_ARGUMENTS = "MaxArguments"
}

export enum ConclusionStrategy {
    SHORT = "Short",
    LONG = "Long",
    NONE = "None"

}

export enum Engine {
    HUMAN_POWERED = "human-powered",
    CHAT_GPT = "chat-gpt",
    CHAT_GPT_THREE = "chat-gpt-three",
    REPLICATE__LLAMA_2_70B = "replicate-llama-2-70b",
    REPLICATE__LLAMA_VICUNA = "replicate-llama-vicuna",
}

export enum SpeakerType {
    AI = "ai",
    HUMAN = "human",
}
