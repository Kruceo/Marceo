import { textify } from "../lib/textify.mjs";

export function inlineCodeElement(first,last,content){
    return `<span id="markdown" class="inline-code">
    ${textify(content)}
</span>`
}