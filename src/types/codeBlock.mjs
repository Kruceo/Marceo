import { textify } from "../lib/textify.mjs";

export function codeBlockElement(a,b,content){
    return `<div \
style="white-space:pre-wrap;" \
id="markdown" \
class="code-block">${textify(content)
    }
</div>`
}