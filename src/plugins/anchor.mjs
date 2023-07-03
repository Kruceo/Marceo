import Plugin from "../lib/Plugin.mjs"
import Regex from "../lib/Regex.mjs"
import { textify } from "../lib/textify.mjs"

export function anchorElement(first,last,content){

    let text = first[0].slice(1,first.length-3)
    return `<a class="markdown anchor" href="${textify(content)}">${text}</a>`
}

export const anchor = new Plugin([
    new Regex('\\[.*?\\]\\('                       , ".*?"                 , "\\)"                  , anchorElement),
])