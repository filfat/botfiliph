import home from "./views/home";

export default (app, base) => {
    app.get('/', (req, res) => {
        res.send(home(req, base));
    });
}