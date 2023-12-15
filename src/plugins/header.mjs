import Plugin from "../lib/Plugin.mjs"
import Regex from "../lib/Regex.mjs"
import { idfy } from "../lib/idfy.mjs"
import { differentTableElement } from "./differentTable.mjs"

function header1Element(first, last, content) {
    const id = idfy(content)
    return `<h1 id="${id}" class="markdown header1" >
    ${content}
    </h1>`
}
function header2Element(first, last, content) {
    console.log(content)
    const id = idfy(content)
    return `<h2 id="${id}" class="markdown header2" >${content}</h2>`
}
function header3Element(first, last, content) {
    const id = idfy(content)
    return `<h3 id="${id}" class="markdown header3" >${content}</h3>`
}
function header4Element(first, last, content) {
    const id = idfy(content)
    return `<h4 id="${id}" class="markdown header4" >${content}</h4>`
}
function header5Element(first, last, content) {
    const id = idfy(content)
    return `<h5 id="${id}" class="markdown header5" >
    ${content}
    </h5>`
}
function header6Element(first, last, content) {
    const id = idfy(content)
    return `<h6 id="${id}" class="markdown header6" >${content}</h6>`
}

export const headers = new Plugin([
    new Regex(`(?:\n)###### `, "[^\n]+?", `(?=\n)`, header6Element),
    new Regex(`(?:\n)##### `, "[^\n]+?", `(?=\n)`, header5Element),
    new Regex(`(?:\n)#### `, "[^\n]+?", `(?=\n)`, header4Element),
    new Regex(`(?:\n)### `, "[^\n]+?", `(?=\n)`, header3Element),
    new Regex(`(?:\n)## `, "[^\n]+?", `(?=\n)`, header2Element),
    new Regex(`(?:\n)# `, "[^\n]+?", `(?=\n)`, header1Element),
])