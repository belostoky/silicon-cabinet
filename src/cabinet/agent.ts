import { Credentials } from "../helpers/auth";
import { Engine } from "../helpers/enums";

export abstract class Agent {
    engine: Engine;
    role: string;
    roles: string[];
    color: string;
    credentials: Credentials;
    
    constructor(engine: Engine, role: string, otherRoles: string[], color: string, credentials: Credentials) {
        if (!engine) {
            this.engine = this.pickRandomEngine();
        } else {
            this.engine = engine;
        }
        
        this.role = role;
        this.roles = otherRoles;
        this.color = color
        this.credentials = credentials;
    }
    
    pickRandomEngine(): Engine {
        const engineValues = Object.values(Engine);
        const randomIndex = Math.floor(Math.random() * engineValues.length);
        return engineValues[randomIndex] as Engine;
    }
    
    abstract call(prompt: string): Promise<string | null>;
}
