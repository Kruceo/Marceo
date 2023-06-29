import Plugin from "../lib/Plugin.mjs"
import Regex from "../lib/Regex.mjs"

export function tableElement(first, last, content) {


    let NEWLINE = first[0].replaceAll('|', '')
    let padContent = content.replace(new RegExp(`(?!\\|)${NEWLINE}(?!\\|)`, 'g'), `|${NEWLINE}|`)
    console.log("NEWLINE:", NEWLINE)
    const split = padContent.split('|')
    console.log(padContent)
    let rowIndex = 0
    let rows = []
    let isHeader = true
    split.forEach(element => {
        if (element == '') return;
        if (element == NEWLINE) {
            rowIndex++
            return null;
        }

        if (/^(\s)*?\-(\-)+\-(\s)*?$/.test(element)) {
            console.log('|' + element + '|', true)
            isHeader = false
            return null
        }

        if (!rows[rowIndex]) rows[rowIndex] = []
        rows[rowIndex].push(
            {
                content: element,
                isHeader,
            })
    });


    const biggerRowLength = [...rows].sort((a, b) => b.length - a.length)[0].length
    let result = ''
    let error = false
    rows.forEach((row, rowIndex) => {
        let rowCelWidth = biggerRowLength / row.length
        if (("" + rowCelWidth).includes('.')) error = true
        row.forEach((col, colIndex) => {
            let isLeft = (colIndex == 0)
            let isRight = (colIndex == rows[rowIndex].length - 1)
            let isBottom = (rowIndex == rows.length - 1)
            let isTop = (rowIndex == 0)

            result += `<div id="markdown" class="cel ${isLeft ? "left" : ''} ${isRight ? "right" : ''} ${isBottom ? 'bottom' : ''} ${isTop ? 'top' : ''} ${col.isHeader ? 'header' : ''}" \
            style="grid-column:span ${rowCelWidth}"\
            >${col.content}</div>`
        })
    })
    if (error) return first[0] + content + last[0]
    return `\
<div id="markdown" class="table" style="display:grid; grid-template-columns:repeat(${biggerRowLength},1fr)"> \
${result} \
</div>`
}

export const table = new Plugin([
    new Regex("\n(?!\\|)", "[^#\n]+?\\|[^\n]+", "(?=\n)", (f, l, c) => { return "\n|" + c + "|" }),  //prepare to accept non-piped tables
    new Regex(`(?:\n)\\|`, `.*?`, `\\|\n(?!\\|)`, tableElement),
])