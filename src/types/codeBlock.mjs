import Plugin from "../lib/Plugin.mjs";
import Regex from "../lib/Regex.mjs";
import { textify } from "../lib/textify.mjs";
import { differentTableElement } from "./differentTable.mjs";

export function codeBlockElement(a,b,content){
   const language = a[0].replaceAll('\n','').replaceAll('`','')
    return `
<div class="markdown code-block">\
<div class="markdown language">${textify(language)}</div>\
<div class="markdown code" style="white-space:pre-wrap;">${textify(content)}</div>
</div>
`
}

export const codeBlock = new Plugin([
    new Regex('(\\`\\`\\`).*?\n', ".*?", '(\\`\\`\\`)', codeBlockElement),
])