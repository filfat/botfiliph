import html from "../components/html";
import header from "../components/header";
import main from "../components/main";
import dashboard from "../components/dashboard";

export default (req, base) => {
    return html(null, `
        ${header()}
        ${main(`
            ${dashboard(base)}
        `)}
    `);
}