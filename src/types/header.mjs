import Plugin from "../lib/Plugin.mjs"
import Regex from "../lib/Regex.mjs"
import { differentTableElement } from "./differentTable.mjs"

function header1Element(first, last, content) {
    return `<h1 id="markdown" class="header1" >${content}</h1>${last}`
}
function header2Element(first, last, content) {
    return `<h2 id="markdown" class="header2" >${content}</h2>${last}`
}
function header3Element(first, last, content) {
    return `<h3 id="markdown" class="header3" >${content}</h3>${last}`
}
function header4Element(first, last, content) {
    return `<h4 id="markdown" class="header4" >${content}</h4>${last}`
}
function header5Element(first, last, content) {
    return `<h5 id="markdown" class="header4" >${content}</h5>${last}`
}
function header6Element(first, last, content) {
    return `<h6 id="markdown" class="header4" >${content}</h6>${last}`
}

export const headers = new Plugin([
    new Regex(`(?:\n)###### `, ".*?", `(?:\n)`, header6Element),
    new Regex(`(?:\n)##### `, ".*?", `(?:\n)`, header5Element),
    new Regex(`(?:\n)#### `, ".*?", `(?:\n)`, header4Element),
    new Regex(`(?:\n)### `, ".*?", `(?:\n)`, header3Element),
    new Regex(`(?:\n)## `, ".*?", `(?:\n)`, header2Element),
    new Regex(`(?:\n)# `, ".+?", `(?=\n)`, header1Element),
])