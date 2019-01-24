import Twitch from "twitch-js";

const TOKEN = process.env.TWITCH_TOKEN || 'oauth:t9a5o0j4785recf07lj4r5n2i050ff';
const USERNAME = process.env.TWITCH_USERNAME || 'fakebotnetisfake';
const CLIENT_ID = process.env.TWITCH_CLIENT_ID || '9f38ppsn68skqoy5g60yg5i51erhg9';
const CHANNEL = process.env.CHANNEL || '#filiphsandstrom';

class BotBase {
    constructor () {
        this.state = {
            twitch_app: new Twitch({ token: TOKEN, username: USERNAME, clientId: CLIENT_ID }),

            chat: {
                global_state: null,
                channel_state: null,
                log: [],
            },

            commands: [
                {
                    id: "hi",
                    handler: ({username}) => {
                        twitch_app.chat.say(CHANNEL, `Howdy ${username}!`);
                    }
                }
            ]
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

            self.state.chat.log.push({
                type,
                username,
                message,
                tags,
            });

            if(type === "command")
                self.handle_command({username, message, tags});
        })
    }

    handle_command ({username, message, tags}) {
        let hits = 0;
        for (let i = 0; i < this.state.commands.length; i++) {
            const command = this.state.commands[i];

            // TODO: Loop thru aliases
            if (message.includes(command.id)) {
                hits += 1;

                if(command.handler) command.handler({username, message, tags});
            }
        }

        if(!hits) this.state.twitch_app.chat.say(CHANNEL, `Unknown command "${message}"!`);
    }

    register_command () {

    }
}

export default (new BotBase())