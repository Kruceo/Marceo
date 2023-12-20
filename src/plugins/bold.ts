import Plugin from "../lib/Plugin";

function boldElement(start:string,content:string) { 
    return `<span class="markdown bold">${content}</span>` 
}

export const bold = new Plugin(/\*\*/, /.+?/, /\*\*/, 'bold', boldElement)