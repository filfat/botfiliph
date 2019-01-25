import path from "path";
import env from "dotenv";

import express from "express";
import sassMiddleware from "node-sass-middleware";

import bot_base from "./bot_base";
import paths from "./paths";

env.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(sassMiddleware({
    src: "scss",
    dest: path.join(__dirname, "public"),
    debug: false,
    response: true,
    outputStyle: "compressed",
    prefix:  "/public"
}));
app.use('/public', express.static("public"))

bot_base.commands.register({
    id: "hi",
    handler: (self, {username}) => {
        self.messenger.send(`Howdy @${username}!`);
    }
});
bot_base.commands.register({
    id: "repo",
    handler: (self, {username}) => {
        self.messenger.send(`@${username} -> https://github.com/filfat/twitch-chat-bot`);
    }
});

paths(app, bot_base);
app.listen(port, () => {
    let ready_interval = setInterval(() => {
        if(!bot_base.state.emoticons.ready) return;
        
        clearInterval(ready_interval);
    });

    console.info(`Bot started on port ${port}!`);
})