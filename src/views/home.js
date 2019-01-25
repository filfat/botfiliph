import html from "../components/html";
import header from "../components/header";
import main from "../components/main";
import chatbox from "../components/chatbox";
import userbox from "../components/userbox";
import stream from "../components/stream";
import panel_layout from "../components/panel_layout";

export default (req, base) => {
    return html(null, `
        ${header()}
        ${main(`
            ${panel_layout(`
                ${stream(base)}
            `, `
                ${chatbox(base)}
                ${userbox(base)}
            `)}
        `)}
    `);
}