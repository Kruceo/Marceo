import Plugin from "../lib/Plugin.mjs"
import Regex from "../lib/Regex.mjs"

function breaklineElement(first, last, content) {
    return "<p></p>"
}

export const breakline = new Plugin([
    new Regex("\n", "(\n)+?", "(?!\n)", breaklineElement)
])