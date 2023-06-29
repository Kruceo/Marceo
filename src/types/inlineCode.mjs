import Plugin from "../lib/Plugin.mjs";
import Regex from "../lib/Regex.mjs";
import { textify } from "../lib/textify.mjs";

function inlineCodeElement(first, last, content) {
    return `<span id="markdown" class="inline-code">${textify(content)}</span>`
}

export const inlineCode = new Plugin([
    new Regex('\\`', ".*?", '\\`', inlineCodeElement)
])