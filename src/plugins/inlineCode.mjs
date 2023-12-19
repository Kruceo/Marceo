import Plugin from "../lib/Plugin.mjs";
// import { textify } from "../lib/textify.mjs";

function inlineCodeElement(first, content, last) {
    return `<span class="markdown inline-code">${content}</span>`
}

export const inlineCode = new Plugin(/`/,/.+?/,/`/,"inlinecode", inlineCodeElement)