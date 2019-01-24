import Twitch from "twitch-js";

const TOKEN = process.env.TWITCH_TOKEN || 'oauth:t9a5o0j4785recf07lj4r5n2i050ff';
const USERNAME = process.env.TWITCH_USERNAME || 'fakebotnetisfake';
const CLIENT_ID = process.env.TWITCH_CLIENT_ID || '9f38ppsn68skqoy5g60yg5i51erhg9';
const CHANNEL = process.env.CHANNEL || '#filiphsandstrom';

class BotBase {
    constructor () {
        this.TOKEN      = TOKEN;
        this.USERNAME   = USERNAME;
        this.CLIENT_ID  = CLIENT_ID;
        this.CHANNEL    = CHANNEL;

        this.state = {
            twitch_app: new Twitch({ token: TOKEN, username: USERNAME, clientId: CLIENT_ID }),

            chat: {
                global_state: null,
                channel_state: null,
            },

            commands: [{
                id: "commands",
                aliases: ["help", '?'],
                handler: (self, {username}) => {
                    let output = '';
                    for(let i = 0; i < self.state.commands.length; i++) {
                        output += `"${self.state.commands[i].id}"${(i + 1) !== self.state.commands.length ? ", " : ''}`;
                    }

                    self.state.twitch_app.chat.say(self.CHANNEL, `@${username} -> list of commands: [${output}]`);
                }
            }],

            log: {
                messages: [],
                users: [],
            },
        };

        const self = this;
        const twitch_app = self.state.twitch_app;
        twitch_app.chat.connect().then(global_state => {
            self.state.chat.global_state = global_state;

            twitch_app.chat.join(CHANNEL).then(channel_state => {
                self.state.chat.channel_state = channel_state;
            })
        }).catch(err => console.log(err));

        twitch_app.chat.on('PRIVMSG', ({username, message, tags}) => {
            let type = "text";
            if(message.charAt(0) === '!') type = "command";

            self.state.log.messages.push({
                type,
                username,
                message,
                tags,
            });

            if(type === "command")
                self.handle_command({username, message, tags});
        });

        twitch_app.chat.on('JOIN', ({username, timestamp}) => {
            self.state.log.users.push({timestamp, username});
        })
    }

    handle_command ({username, message, tags}) {
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

        if(!hits) this.state.twitch_app.chat.say(CHANNEL, `Unknown command "${message}"!`);
    }

    register_command ({id, aliases, handler}) {
        this.state.commands.push({id, aliases, handler});
    }
}

export default (new BotBase())