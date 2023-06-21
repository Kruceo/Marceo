export function inlineCodeElement(first,last,content){
    return `<span id="markdown" style="background:#ddd;padding:0px" class="inline-code">
    ${content}
</span>`
}