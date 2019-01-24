import uuid from "uuid/v4";

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

    let id = `ChatBox_${uuid()}`;
    return `
        <div id="${id}" class="ChatBox">
            <div class="details">
                ${state.log.messages.length} Logged Messages
            </div>
            <div class="container">
                ${output}
            </div>
            <script>
                "use strict";
                var converter = new showdown.Converter();
                document.getElementById(${id}).innerHTML = converter.makeHtml(text);
            </script>
        </div>
    `;
}