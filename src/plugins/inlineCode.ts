import Plugin from "../lib/Plugin";
// import { textify } from "../lib/textify.mjs";

function inlineCodeElement(first:string, content:string, last:string) {
    return `<span class="markdown inline-code">${content}</span>`
}

export const inlineCode = new Plugin(/`/,/.+?/,/`/,"inlinecode", inlineCodeElement)