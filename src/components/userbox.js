export default (base) => {
    let output = '';

    const users = base.users.get();
    for (let i = 0; i < users.length; i++) {
        const user = users[i];

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
                ${users.length} Logged Users
            </div>
            ${output}
        </div>
    `;
}