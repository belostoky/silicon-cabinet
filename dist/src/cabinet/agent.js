"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
const enums_1 = require("../helpers/enums");
class Agent {
    constructor(engine, role, otherRoles, color, credentials) {
        if (!engine) {
            this.engine = this.pickRandomEngine();
        }
        else {
            this.engine = engine;
        }
        this.role = role;
        this.roles = otherRoles;
        this.color = color;
        this.credentials = credentials;
    }
    pickRandomEngine() {
        const engineValues = Object.values(enums_1.Engine);
        const randomIndex = Math.floor(Math.random() * engineValues.length);
        return engineValues[randomIndex];
    }
}
exports.Agent = Agent;
