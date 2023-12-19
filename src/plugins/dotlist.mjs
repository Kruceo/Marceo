import Plugin from "../lib/Plugin.mjs";

function dotlistElement(start,content,last){
    const level = Math.floor(start.length/3)
    return `<p class="markdown list-dot level${level}">${content}</p>`
}

export const dotlist = new Plugin(/(?<=\n)\s*- /, /.+?/, /(?=\n)/, 'dotlist',dotlistElement )