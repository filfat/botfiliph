import head from "./head";
import body from "./body";

export default (h, b) => {
    return `
        <!DOCTYPE html>
        <html>
            ${head(h)}
            ${body(b)}
        </html>
    `;
}