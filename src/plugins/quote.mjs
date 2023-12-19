import Plugin from "../lib/Plugin.mjs"

function quoteElement(first, content, last) {
    return `<div class="markdown quote">${content}</div>`
}

export const quote = new Plugin(/>/,/.+?/,/\n/,"quote",quoteElement)