export default (content) => {
    return `
        <main>
            ${content || ''}
        </main>
    `;
}