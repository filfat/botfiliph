import path from "path";
import env from "dotenv";

import consola from "consola";

import express from "express";
import sassMiddleware from "node-sass-middleware";

import bot_base from "./bot_base";
import router from "./router";
import pluginLoader from "./plugin_loader";

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

let state = {
    bot_base,
    plugin_loader: new pluginLoader(app, bot_base)
}

app.listen(port, () => {
    router(app, bot_base);
    state.plugin_loader.load_all();

    consola.info(`Bot started on port ${port}!`);
})