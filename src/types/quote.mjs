import Plugin from "../lib/Plugin.mjs"
import Regex from "../lib/Regex.mjs"

function quoteElement(first, last, content) {
    return `<div id="markdown" class="quote">${content}</div>`
}

export const quote = new Plugin([
    new Regex('\n(>)', ".*?", "\n", quoteElement),
])