import Plugin from "../lib/Plugin.mjs"
import Regex from "../lib/Regex.mjs"

function scratchedElement(first, last, content) {
    return `<span class="markdown scratched" style="text-decoration:line-through">${content}</span>`
}

export const scratched = new Plugin([
    new Regex('~~', ".*?", '~~', scratchedElement),
])