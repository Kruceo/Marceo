import Plugin from "../lib/Plugin.mjs";

function imageElement(start,content,end){
    return `<img src="${content}" title="${start.slice(2,start.length-2)}"></img>`
}

export const image = new Plugin(/\!\[.+?\]\(/, /.+?/, /\)/, 'anchor',imageElement)