import Plugin from "../lib/Plugin.mjs";

function dotlistElement(start,content,last){
    const level = Math.floor(start.length/4)

    return `<p>${start}</p><p class="markdown list-dot level${level}">${content}</p>`
}

export const dotlist = new Plugin(/\n(\ )*- /, /.+?/, /(?=\n)/, 'dotlist',dotlistElement )