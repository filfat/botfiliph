import XSS from "xss";
class BotMessenger {
    constructor(chat, {channel}) {
        this.chat = chat;
        this.state = {
            channel: channel || '#filiphsandstrom',
            messages: []
        };
    }

    async connect() {
        let global_state = await this.chat.connect();
        let channel_state = await this.chat.join(this.state.channel);

        let self = this;
        this.chat.on('PRIVMSG', ({username, message, tags}) => {
            if(message.charAt(0) === '!') return;

            self.state.messages.push({
                username,
                message: XSS(message),
                tags,
            });
        });

        let res = {global_state, channel_state};
        this.state = {...this.state, ...res};
        return res;
    }

    get() {
        return this.state.messages;
    }

    send(message) {
        this.chat.say(this.state.channel, message);
    }
}

export default BotMessenger;