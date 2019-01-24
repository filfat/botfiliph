import html from "./components/html";
import header from "./components/header";
import main from "./components/main";
import chatbox from "./components/chatbox";
import userbox from "./components/userbox";
import stream from "./components/stream";
import panel_layout from "./components/panel_layout";

export default (app, bot_base) => {
    app.get('/', (req, res) => {
        res.send(html(null, `
            ${header()}
            ${main(`
                ${panel_layout(`
                    ${stream(bot_base)}
                `, `
                    ${chatbox(bot_base.state)}
                    ${userbox(bot_base.state)}
                `)}
            `)}
        `));
    });
}