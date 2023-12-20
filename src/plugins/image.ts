import Plugin from "../lib/Plugin";

function imageElement(start:string,content:string,end:string){
    return `<img src="${content}" title="${start.slice(2,start.length-2)}"></img>`
}

export const image = new Plugin(/\!\[.+?\]\(/, /.+?/, /\)/, 'anchor',imageElement)