import consola from "consola";
import fs from "fs";

class BotCommands {
    constructor (chat, base) {
        this.base = base;
        this.state = {
            commands: [],
            log: []
        };

        let self = this;
        chat.on('PRIVMSG', ({username, message, tags}) => {
            if(message.charAt(0) !== '!') return;

            self.state.log.push({
                username,
                message: message,
                tags,
            });

            self.handle({username, message, tags});
        });


        // Load default commands from commands directory
        fs.readdirSync(__dirname + "/commands/").forEach((file) => {
            self.register(require("./commands/" + file).default);

            consola.info(`Bot->Commands->Loaded: "${file}"!`);
        });
    }

    get () {
        return this.state.commands;
    }

    handle ({username, message, tags}) {
        let hits = 0;
        for (let i = 0; i < this.state.commands.length; i++) {
            const command = this.state.commands[i];
            let hit = false;
            
            if (message.includes(command.id)) hit = true;
            else if (command.aliases)
                for (let i = 0; i < command.aliases.length; i++) {
                    const alias = command.aliases[i];
                    if(message.includes(alias)) hit = true;
                }

            if (hit) {
                hits += 1;

                if(command.handler) command.handler(this.base, {username, message, tags});
            }
        }

        if(!hits) return consola.warn(`Unknown command "${message}"!`);
    }

    register ({id, aliases, handler}) {
        // TODO: check args
        this.state.commands.push({id, aliases, handler});
    }
}

export default BotCommands;