import Plugin from "../lib/Plugin"

function anchorElement(start:string,content:string,end:string) {
    const label = content
    const url = end.slice(2,end.length-1)
    return `<a class="markdown anchor" href="${url}">${label}</a>`
}

export const anchor = new Plugin(/\[/, /.+?/, /\]\(.*?\)/, 'anchor', anchorElement)