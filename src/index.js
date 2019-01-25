import path from "path";
import env from "dotenv";

import consola from "consola";

import express from "express";
import sassMiddleware from "node-sass-middleware";

import bot_base from "./bot_base";
import router from "./router";

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

app.listen(port, () => {
    router(app, bot_base);
    consola.info(`Bot started on port ${port}!`);
})