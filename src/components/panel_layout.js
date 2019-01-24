export default (main, side) => {
    return `
        <div class="PanelLayout">
            <div class="main">${main}</div>
            <div class="side">${side}</div>
        </div>
    `;
}