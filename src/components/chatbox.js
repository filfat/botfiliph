import uuid from "uuid/v4";

export default (base) => {
    let output = '';

    let messages = base.messenger.get();
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i];

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
                ${messages.length} Logged Messages
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