export default (content) => {
    return `
        <head>
            <title>filiphsandstrom - Twitch bot</title>

            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600"/>
            <link rel="stylesheet" href="public/styles.css"/>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/<version tag>/showdown.min.js"></script>
            ${content || ''}
        </head>
    `;
};