import express from "express";
import bot_base from "./bot_base";

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json(bot_base.state.chat.log);
});

app.listen(port, () => {
    // TODO: ehh
    console.info(`Bot started on port ${port}!`);
})