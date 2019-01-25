export default (content) => {
    return `
        <head>
            <title>filiphsandstrom - Twitch bot</title>

            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600"/>
            <link rel="stylesheet" href="public/styles.css"/>

            <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.0/showdown.js"></script>
            <script src="https://unpkg.com/draggabilly@2/dist/draggabilly.pkgd.min.js"></script>
            <script src="https://unpkg.com/packery@2/dist/packery.pkgd.min.js"></script>
            ${content || ''}
        </head>
    `;
};