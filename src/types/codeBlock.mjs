import { textify } from "../lib/textify.mjs";

export function codeBlockElement(a,b,content){
   const language = a[0].replaceAll('\n','').replaceAll('`','')
    return `\
<div id="markdown" class="code-block">
    <div class="language">${language}</div>
    <div class="code" style="white-space:pre-wrap;">${textify(content)}</div>
</div>`
}