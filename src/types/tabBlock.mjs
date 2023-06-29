import Plugin from "../lib/Plugin.mjs";
import Regex from "../lib/Regex.mjs";
import { textify } from "../lib/textify.mjs";
import { differentTableElement } from "./differentTable.mjs";

export function tabBlockElement(a,b,content){
    let c = content.split('\n')
        .reduce((acum,next)=>{
            let n = next + '\n'
            if(/^( {4})/.test(n)){
                n = n.slice(4,n.length)
            }
            return acum + n

        },'')
    return `<div id="markdown" class="tab-block"><div class="code" style="white-space:pre-wrap;">${textify(c)}\</div></div>`
}

export const tabBlock = new Plugin([
    new Regex('(\n {4})', "[^\\`]+?", '\n(?!\\s{4})(\n)*?', tabBlockElement)

])