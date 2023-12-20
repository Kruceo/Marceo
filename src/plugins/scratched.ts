import Plugin from "../lib/Plugin"

function scratchedElement(first:string, content:string, last:string) {
    return `<span class="markdown scratched" style="text-decoration:line-through">${content}</span>`
}

export const scratched = new Plugin(/~~/, /.*?/, /~~/,"scratched", scratchedElement)