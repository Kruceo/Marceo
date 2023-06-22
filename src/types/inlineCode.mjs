export function inlineCodeElement(first,last,content){
    return `<span id="markdown" class="inline-code">
    ${content}
</span>`
}