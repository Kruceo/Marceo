export function anchorElement(first,last,content){

    let text = first[0].slice(1,first.length-3)
    return `<a id="markdown" class="anchor" href="${content.replaceAll("_","&UnderBar;")}">${text}</a>`
}