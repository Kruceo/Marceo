import Plugin from "../lib/Plugin.mjs"

function scratchedElement(first, content, last) {
    return `<span class="markdown scratched" style="text-decoration:line-through">${content}</span>`
}

export const scratched = new Plugin(/~~/, /.*?/, /~~/,"scratched", scratchedElement)