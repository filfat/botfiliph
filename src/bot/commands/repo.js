export default {
    id: "repo",
    handler: (self, {username}) => {
        self.messenger.send(`@${username} -> https://github.com/filfat/twitch-chat-bot`);
    }
}