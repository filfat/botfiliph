export default {
    id: "commands",
    aliases: ["help", '?'],
    handler: (self, {username}) => {
        let output = '';

        let commands = self.commands.get();
        for(let i = 0; i < commands.length; i++) {
            output += `"${commands[i].id}"${(i + 1) !== commands.length ? ", " : ''}`;
        }

        self.messenger.send(`@${username} -> list of commands: [${output}]`);
    }
}