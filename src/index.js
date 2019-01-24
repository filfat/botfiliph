import path from "path";

import express from "express";
import sassMiddleware from "node-sass-middleware";

import bot_base from "./bot_base";
import paths from "./paths";

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

bot_base.register_command({
    id: "hi",
    handler: (self, {username}) => {
        self.state.twitch_app.chat.say(self.CHANNEL, `Howdy @${username}!`);
    }
});

paths.handler(app, bot_base);
app.listen(port, () => {

    // TODO: ehh
    console.info(`Bot started on port ${port}!`);
})