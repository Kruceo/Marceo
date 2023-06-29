import Plugin from "../lib/Plugin.mjs"
import Regex from "../lib/Regex.mjs"

function numListElement(first,last,content){
    const space = parseInt(first[0].slice(first[0].indexOf(' '),first[0].lastIndexOf(' ')).length/3)
    return `
<div id="markdown" class="list-item level${space}">\
    <span id="markdown" class="pad" style="white-space:pre-wrap">${"".padEnd(space*10, ' ')}</span>\
    <span id="markdown" class="num left level${space}"></span>\
    <span id="markdown" class="num level${space}">${first[0].replace('.','').replace('\n','')}</span>\
    <span id="markdown" class="num right level${space}"></span>\
    ${content}\
</div>\
${last[0]}`
}

export const numList = new Plugin([
    new Regex('(\n *?\\d\\.)'         , ".*?"                 , `(?=\n)`       , numListElement)
])