export default (state) => {
    let output = '';

    for (let i = 0; i < state.log.messages.length; i++) {
        const message = state.log.messages[i];
        if(message.type !== "text") continue;

        output += `
            <div class="chat-item">
                <span class="username">
                    ${message.username}
                </span>
                <span class="messsage">
                    ${message.message}
                </span>
            </div>
        `;
    }

    return `
        <div class="ChatBox">
            <div class="details">
                ${state.log.messages.length} Logged Messages
            </div>
            ${output}
        </div>
    `;
}