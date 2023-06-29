import Plugin from "../lib/Plugin.mjs";
import Regex from "../lib/Regex.mjs";
import { textify } from "../lib/textify.mjs";
import { differentTableElement } from "./differentTable.mjs";

export function codeBlockElement(a,b,content){
   const language = a[0].replaceAll('\n','').replaceAll('`','')
    return `\
<div id="markdown" class="code-block"><div class="language">${textify(language)}</div><div class="code" style="white-space:pre-wrap;">${textify(content)}</div>
</div>`
}

export const codeBlock = new Plugin([
    new Regex('(\\`\\`\\`).*?\n', ".*?", '(\\`\\`\\`)', codeBlockElement),
])