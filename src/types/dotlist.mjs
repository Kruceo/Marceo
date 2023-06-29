import Plugin from "../lib/Plugin.mjs"
import Regex from "../lib/Regex.mjs"

function dotListElement(first, last, content) {
    const space = parseInt(first[0].slice(first[0].indexOf(' '), first[0].lastIndexOf(' ')).length / 3)
    return `
<div id="markdown" class="list-item level${space}"> \
<span style="white-space:pre-wrap">${"".padEnd(space * 10, ' ')}</span> \
<span id="markdown" class="list-dot level${space}"></span>${content} \
</div> \
${last[0]}`

}

export const dotList = new Plugin([
    new Regex("(\n\\s*?\\-)[^\\-]", "[^\\*]*?", `(?=\n)`, dotListElement),
    new Regex('\n\\* ', "[^\\*]*?", `(?=\n)`, dotListElement),
])