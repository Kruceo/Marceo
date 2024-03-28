import Plugin from "../lib/Plugin"

function quoteElement(first:string, content:string, last:string) {
    return `<blockquote class="markdown quote">${content}</blockquote>`
}

export const quote = new Plugin(/\n>/,/.+?/,/\n/,"quote",quoteElement)