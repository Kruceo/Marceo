import Plugin from "../lib/Plugin.mjs"
import Regex from "../lib/Regex.mjs"

function lineElement(first, last, content) {
    return `<div id="markdown" class="line"></div>`
}

export const line = new Plugin([
    new Regex(`-`, "(-)*", `--`, lineElement),
])