import express from "express";

const app = express();
const port = process.env.PORT || 3000;

const token = process.env.TWITCH_TOKEN || '';
const username = process.env.TWITCH_USERNAME || '';
const channel = process.env.CHANNEL || '';

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
    res.send("hello world");
})

app.listen(port, () => {
    // TODO: ehh
    console.info(`Bot started on port ${port}!`);
})