import Plugin from "../lib/Plugin";

function dotlistElement(start:string,content:string,last:string){
    const level = Math.floor(start.length/4)

    return `<p class="markdown list-dot level${level}">${content}</p>`
}

export const dotlist = new Plugin(/\n(\ )*- /, /.+?/, /(?=\n)/, 'dotlist',dotlistElement )