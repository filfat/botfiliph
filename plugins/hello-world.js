import consola from "consola";

const metadata = {
    id: "hello-world",
    author: "Filiph",
    description: "Description goes here",
}

const init = () => {
    consola.info(`${metadata.id}: is loading...`);
}

export default {
    ...metadata,

    init,
    exit: () => {},

    on_event: () => {},
};