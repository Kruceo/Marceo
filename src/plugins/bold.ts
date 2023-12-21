import Plugin from "../lib/Plugin";

function boldElement(start:string,content:string) { 
    return `<strong class="markdown bold">${content}</strong>` 
}

export const bold = new Plugin(/\*\*/, /.+?/, /\*\*/, 'bold', boldElement)