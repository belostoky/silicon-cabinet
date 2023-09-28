import chalk, { ChalkInstance } from "chalk";

interface Argument {
    role: string;
    body: string;
    color: string;
}

export class Discussion {
    arguments: any;
    context: any;
    constructor(context: string) {
        console.log("Discussing: " + context + "\n");
        this.context = context;
        this.arguments = [];
    }

    addArgument(body: string, role: string, color: string) {
        let argument = { role, body, color } as Argument;
        this.printArgument(argument);
        this.arguments.push(argument);
    }

    print() {
        console.log("Discussing: " + this.context + "\n");
        for (let argument of arguments) {
            this.printArgument(argument);
        }
    }

    toString() {
        let discussion = this.context + "/n";
        discussion = discussion + this.getArguments().map((item)=>item.role+" : "+item.body).join("/n");
        return discussion;
    }

    printArgument(argument: Argument) {

        let message = argument.role + ": " + argument.body
        const colorMap: Record<string, ChalkInstance> = {
            red: chalk.red,
            blue: chalk.blue,
            green: chalk.green,
            yellow: chalk.yellow,
        };
    
        const colorFunction = colorMap[argument.color] || chalk.white; // Default to white if color is not found
        console.log(colorFunction(message));
    }

    getArguments(): Argument[] {
        return this.arguments;
    }

    getContext(): string{
        return this.context;
    }

}