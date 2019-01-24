export default (state) => {
    let output = '';

    for (let i = 0; i < state.log.users.length; i++) {
        const user = state.log.users[i];

        output += `
            <div class="user-item">
                <span class="username">
                    ${user.username}
                </span>
            </div>
        `;
    }

    return `
        <div class="UserBox">
            <div class="details">
                ${state.log.users.length} Logged Users
            </div>
            ${output}
        </div>
    `;
}