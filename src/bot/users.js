class BotUsers {
    constructor(chat) {
        this.state = {
            users: [],
        };

        let self = this;
        chat.on('JOIN', ({username, timestamp}) => {
            for (let i = 0; i < self.state.users.length; i++) {
                let item = self.state.users[i];

                if (item.username === username) return;
            }

            self.state.users.push({timestamp, username});
        });
    }

    get() {
        return this.state.users;
    }
}

export default BotUsers;