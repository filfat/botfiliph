import header from "./components/header";
import main from "./components/main";
import chatbox from "./components/chatbox";
import userbox from "./components/userbox";
import panel_layout from "./components/panel_layout";

const html = (h, b) => {
    return `
        <!DOCTYPE html>
        <html>
            ${head(h)}
            ${body(b)}
        </html>
    `;
}

const head = (content) => {
    return `
        <head>
            <title>filiphsandstrom - Twitch bot</title>

            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600"/>
            <link rel="stylesheet" href="public/styles.css"/>
            ${content || ''}
        </head>
    `;
};

const body = (content) => {
    return `
        <body>
            ${content || ''}
        </body>
    `;
};

export default {
    handler: (app, bot_base) => {
        app.get('/', (req, res) => {
            res.send(html(null, `
                ${header()}
                ${main(`
                    Hello World
                    ${panel_layout(``, `
                        ${chatbox(bot_base.state)}
                        ${userbox(bot_base.state)}
                    `)}
                `)}
            `));
        });
    }
};