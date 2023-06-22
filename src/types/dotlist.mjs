export function dotListElement(first,last,content){
    const space = parseInt(first[0].slice(first[0].indexOf(' '),first[0].lastIndexOf(' ')).length/3)
    return `
<p id="markdown" class="list-item">
    <span style="white-space:pre-wrap">${"".padEnd(space*10, ' ')}</span>
    <span id="markdown" class="list-dot">• </span>${content}
</p>
${last[0]}`

}