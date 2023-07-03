import Plugin from "../lib/Plugin.mjs"
import Regex from "../lib/Regex.mjs"

function breaklineElement(first, last, content) {
    return "<br>"
}

export const breakline = new Plugin([
    new Regex("\n", "[\n]+?", "(?!\n)", (a, b, c) => "<br>")
])