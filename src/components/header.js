import paths from "./paths";

export default (content) => {
    return `
        <header>
            <div class="content">
                <div class="logo">
                    botfiliph
                </div>
                <nav>
                    ${content || paths()}
                </nav>
            </div>
        </header>
    `;
}