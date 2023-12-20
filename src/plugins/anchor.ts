import Plugin from "../lib/Plugin"

function anchorElement(start:string,content:string) {
    return `<a class="markdown anchor" href="${content}">${start.slice(1, start.length - 2)}</a>`
}

export const anchor = new Plugin(/(?<!\!)(\[.+?\])\(/, /.+?/, /\)/, 'anchor', anchorElement)