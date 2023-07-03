import Plugin from "../lib/Plugin.mjs"
import Regex from "../lib/Regex.mjs"
import { idfy } from "../lib/idfy.mjs"
import { textify } from "../lib/textify.mjs"

function imageElement(first,last,content){
    const alt = first[0].slice(2,first[0].length - 2)
    let cntt = content
    let title = content.match(/(\"|\').*?(\"|\')/)
    if(title){
        title = title[0]
        cntt = cntt.replaceAll(title,'')}
    console.log(cntt)
    return `<img id="${idfy(alt)}" class="markdown image" src="${textify(cntt)}" title=${textify(title)} alt="${textify(alt)}"></img>`
}

export const image = new Plugin([
    new Regex('\\!\\[.*?\\]\\('                    , ".*?"                 , "\\)"                  , imageElement)
])