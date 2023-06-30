import Plugin from "../lib/Plugin.mjs"
import Regex from "../lib/Regex.mjs"

function italicElement(first, last, content) {
    return `<span style="font-style:italic" class="markdown italic">${content}</span>`
}

export const italic = new Plugin([
    new Regex('\\*(?! )', `.*?(?!\n)`, `\\*`, italicElement),
    new Regex(`(?= |\\b)_`, ".+?", '_(?= |\\b)', italicElement),
])