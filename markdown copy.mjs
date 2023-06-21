import fs from 'fs'
class Regex {
    constructor(firstSymbol, lastSymbol, parseToTag, attributes, contentStart, contentEnd) {
        this.firstSymbol = firstSymbol
        this.lastSymbol = lastSymbol
        this.parseToTag = parseToTag
        this.attributes = attributes
        this.contentStart = contentStart ?? ''
        this.contentEnd = contentEnd ?? ''
    }

    get exp() {
        return new RegExp(this.firstSymbol + '.*?' + this.lastSymbol, 'g')
    }

    applyToString(string) {
        let newString = string + ''
       
        let literalLastSymbol = this.lastSymbol.replaceAll('\\*', '*').replaceAll('\\#', '#').replaceAll('\\`', '`')

        const match = newString.match(this.exp)
        if (match)
            match.forEach((each, index) => {
                let literalFirstSymbol = each.match(new RegExp(this.firstSymbol))
                let literalLastSymbol = each.match(new RegExp(this.lastSymbol))
                console.log(literalFirstSymbol)
                console.log(literalLastSymbol)
                console.log('--------------------------------')
                const content = each.slice(literalFirstSymbol[0].length, each.length - literalLastSymbol[0].length)

                const parsedContentStart = `${this.contentStart.replaceAll('$NUMLIST', "<span id='markdown' class='num'>" + (index + 1) + '. </span>')}`

                const mounted = `<${this.parseToTag} ${this.attributes}>${parsedContentStart}${content}${this.contentEnd}</${this.parseToTag}>\n`
                // console.log(`"${content}"`)
                newString = newString.replace(each,mounted)


                // console.log(each.padEnd(75,' ').replaceAll('\n','') + '|' + mounted.replaceAll('\n', '').padStart(55,' '))
            })
        return newString
    }
}

export function parse(string) {
    const NEWLINE = "@NEWLINE@"
    const TABLEPIPE = "@TABLEPIPE@"
    let raw = ('' + string + '\n')
    .replaceAll('|\n|',TABLEPIPE)
    .replaceAll('\n', NEWLINE)
    /**
     * All that uses NEWLINE like termination, runs first in the array,columns runs first than all
     */
    const regexList = [
        new Regex('---', NEWLINE, 'div', 'id="markdown" style="background:#222;width:100%;height:7px"'),
        new Regex('\\d\\.', NEWLINE, 'div', 'id="markdown"', '$NUMLIST'),
        new Regex('- ', NEWLINE, 'div', 'id="markdown"', '• '),
        new Regex('\\`\\`\\`.*?'+NEWLINE, '\\`\\`\\`', 'code', 'id="markdown" style="display:block;background:#222;color:white;border-left:7px black solid;white-space:pre-wrap"'),
        new Regex('> ', NEWLINE, 'div', 'id="markdown" style="background:#0000;color:black;border-left:7px black solid"', ''),
        new Regex('### ', NEWLINE, 'h3', 'id="markdown"'),
        new Regex('## ', NEWLINE, 'h2', 'id="markdown"'),
        new Regex('# ', NEWLINE, 'h1', 'id="markdown"'),
        new Regex('\\*\\*\\*', '\\*\\*\\*', 'span', 'id="markdown" style="font-style:italic;font-weight:bold"'),
        new Regex('\\*\\*', '\\*\\*', 'span', 'id="markdown" style="font-weight:bold"'),
        new Regex('\\*', '\\*', 'span', 'id="markdown" style="font-style:italic"'),
        new Regex('\\`', '\\`', 'div', 'id="markdown" style="background:#222;color:white;border-left:7px black solid"'),
        new Regex('_', '_', 'span', 'id="markdown" style="font-style:italic"'),

        new Regex(`\\|`,
        
        
        `\\|${NEWLINE}`
        
        
        ,'div', 'id="markdown" style="background:red"'),
    ]

    regexList.forEach((each, index) => {
        raw = each.applyToString(raw)
    })
    return raw.replaceAll(NEWLINE,'<br>')

}




