export default (content) => {
    return `
        <body>
            ${content || ''}
        </body>
    `;
};