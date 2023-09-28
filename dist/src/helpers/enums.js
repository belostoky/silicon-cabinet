"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakerType = exports.Engine = exports.ConclusionStrategy = exports.HaltingStrategy = void 0;
var HaltingStrategy;
(function (HaltingStrategy) {
    HaltingStrategy["MAJORITY_CONSENSUS"] = "Consensus";
    HaltingStrategy["MAX_ARGUMENTS"] = "MaxArguments";
})(HaltingStrategy || (exports.HaltingStrategy = HaltingStrategy = {}));
var ConclusionStrategy;
(function (ConclusionStrategy) {
    ConclusionStrategy["SHORT"] = "Short";
    ConclusionStrategy["LONG"] = "Long";
    ConclusionStrategy["NONE"] = "None";
})(ConclusionStrategy || (exports.ConclusionStrategy = ConclusionStrategy = {}));
var Engine;
(function (Engine) {
    Engine["HUMAN_POWERED"] = "human-powered";
    Engine["CHAT_GPT"] = "chat-gpt";
    Engine["CHAT_GPT_THREE"] = "chat-gpt-three";
    Engine["REPLICATE__LLAMA_2_70B"] = "replicate-llama-2-70b";
    Engine["REPLICATE__LLAMA_VICUNA"] = "replicate-llama-vicuna";
})(Engine || (exports.Engine = Engine = {}));
var SpeakerType;
(function (SpeakerType) {
    SpeakerType["AI"] = "ai";
    SpeakerType["HUMAN"] = "human";
})(SpeakerType || (exports.SpeakerType = SpeakerType = {}));
