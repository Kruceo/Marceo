import Plugin from "../lib/Plugin.mjs"

function breaklineElement(first, last, content) {
    return "<p></p>"
}

export const breakline = new Plugin(
    /\n/,
    /\n/,
    null, 'paragraph', breaklineElement)