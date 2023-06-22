export function imageElement(first,last,content){
    return `<img id="markdown" class="image" src="${content.replaceAll("_","&UnderBar;")}"></img>`
}