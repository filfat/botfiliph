import env from "dotenv";
import Twitch from "twitch-js";
import XSS from "xss";
import { EmoteFetcher, EmoteParser } from "twitch-emoticons";

import messenger from "./bot/messenger";
import commands from "./bot/commands";
import users from "./bot/users";

// Setup env
env.config();

const fetcher = new EmoteFetcher();
const parser = new EmoteParser(fetcher, {
    type: 'markdown',
    match: / (.+?) /g
});

const TOKEN = process.env.TWITCH_TOKEN;
const USERNAME = process.env.TWITCH_USERNAME;
const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CHANNEL = process.env.CHANNEL;

class BotBase {
    constructor () {
        if (!TOKEN || !USERNAME || !CLIENT_ID || !CHANNEL) throw new Error("Token, username, client_id & channel must be defined!");

        this.TOKEN      = TOKEN;
        this.USERNAME   = USERNAME;
        this.CLIENT_ID  = CLIENT_ID;
        this.CHANNEL    = CHANNEL;

        this.state = {
            twitch_app: new Twitch({ token: TOKEN, username: USERNAME, clientId: CLIENT_ID, log: {level: 0} }),

            emoticons: {
                fetcher,
                parser,
                ready: false,
            },

            chat: {
                global_state: null,
                channel_state: null,
            },
        };

        this.messenger = new messenger(this.state.twitch_app.chat, {channel: this.CHANNEL});
        this.commands =  new commands(this.state.twitch_app.chat, this);
        this.users = new users(this.state.twitch_app.chat);
        this.messenger.connect();

        const self = this;
        const twitch_app = self.state.twitch_app;
    }
}

export default (new BotBase())