export default (base) => {
    return `
        <div class="Stream">
            <iframe
                src="https://player.twitch.tv/?channel=${base.CHANNEL}&muted=true"
                height="100%"
                width="100%"
                frameborder="0"
                scrolling="no"
                allowfullscreen="true">
            </iframe>
        </div>
    `;
}