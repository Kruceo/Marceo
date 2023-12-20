import Plugin from "../lib/Plugin"

function quoteElement(first:string, content:string, last:string) {
    return `<div class="markdown quote">${content}</div>`
}

export const quote = new Plugin(/>/,/.+?/,/\n/,"quote",quoteElement)