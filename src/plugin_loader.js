import consola from "consola";
import fs from "fs";

class PluginLoader {
    constructor (app, bot_base) {
        this.state = {
            plugins: []
        }
    }

    load_all () {
        const self = this;
        fs.readdirSync("./plugins/").forEach((file) => {
            self.load("../plugins/" + file);
        });
    }
    load (path) {
        let plugin = require(path).default;
        plugin.path = path;

        if (plugin.init) plugin.init(/* TODO: bot_base, widget_base */);

        // FIXME: Check if id already exists
        this.state.plugins.push(plugin);
        consola.info(`Bot->PluginLoader->Loaded: "${path}"!`);
    }

    reload () {
        for (let i = 0; i < this.state.plugins.length; i++) {
            const plugin = this.state.plugins[0];

            this.unload(plugin.id);
            this.load(plugin.path);
        }
    }

    unload_all () {
        for (let i = 0; i < this.state.plugins.length; i++)
            this.unload(this.state.plugins[i].id);
    }
    unload (id) {
        for (let i = 0; i < this.state.plugins.length; i++)
            if (plugin.id === id) {
                if (plugin.unload) plugin.exit(/* TODO: bot_base, widget_base */);
                this.state.plugins.splice(i, 1);
            }
    }
}

export default PluginLoader;