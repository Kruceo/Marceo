import Plugin from "../lib/Plugin.mjs"
import Regex from "../lib/Regex.mjs"

function taskElement(first, last, content) {
    const checked = first[0] == '[x]'
    return `<span id="markdown" class="task ${checked ? 'checked' : ''}"><div id="markdown" class="inner"></div></span>`
}

export const task = new Plugin([
    new Regex('(\\[ \\]|\\[x\\])', "", '', taskElement),
])