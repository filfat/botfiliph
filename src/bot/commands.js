class BotCommands {
    constructor (chat, base) {
        this.base = base;
        this.state = {
            commands: [{
                id: "commands",
                aliases: ["help", '?'],
                handler: (self, {username}) => {
                    let output = '';
                    for(let i = 0; i < self.state.commands.length; i++) {
                        output += `"${self.state.commands[i].id}"${(i + 1) !== self.state.commands.length ? ", " : ''}`;
                    }
                    self.base.messenger.send(`@${username} -> list of commands: [${output}]`);
                }
            }],
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

                if(command.handler) command.handler(this, {username, message, tags});
            }
        }

        if(!hits) this.base.messenger.send(`Unknown command "${message}"!`);
    }

    register ({id, aliases, handler}) {
        // TODO: check args
        this.state.commands.push({id, aliases, handler});
    }
}

export default BotCommands;