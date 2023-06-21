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
        let parsedFirstSymbol = this.firstSymbol.replaceAll('\\','')
        let parsedLastSymbol =  this.lastSymbol.replaceAll('\\','.')
        const match = newString.match(this.exp)
        if (match)
            match.forEach((each, index) => {
                const content = each.slice(parsedFirstSymbol.length, each.length - parsedLastSymbol.length)

                const parsedContentStart = `${this.contentStart.replaceAll('$NUMLIST', "<span id='markdown' class='num'>" + (index + 1) + '. </span>')}`

                console.log(each)
                // console.log(`"${content}"`)
                newString = newString.replace(each,
                    `<${this.parseToTag} ${this.attributes}>
                    ${parsedContentStart}${content}${this.contentEnd}
                </${this.parseToTag}>\n`)
            })
        return newString
    }
}

export function parse(string) {
    const NEWLINE = '\\$NL'
    let raw = ('' + string +'\n').replaceAll('\n',NEWLINE)

    const regexList = [
        new Regex('### ', NEWLINE, 'h3',                           'id="markdown"'),
        new Regex('## ',  NEWLINE, 'h2',                           'id="markdown"'),
        new Regex('# ',   NEWLINE, 'h1',                           'id="markdown"'),
        new Regex('\\*\\*\\*', '\\*\\*\\*', 'span',                'id="markdown" style="font-style:italic;font-weight:bold"'),
        new Regex('\\*\\*', '\\*\\*',       'span',                'id="markdown" style="font-weight:bold"'),
        new Regex('\\*', '\\*',             'span',                'id="markdown" style="font-style:italic"'),
        new Regex('\\`\\`\\`.*'+NEWLINE, '\\`\\`\\`', 'code',      'id="markdown" style="background:gray;white-space:pre-wrap"'),
        new Regex('\\`', '\\`',             'div',                 'id="markdown" style="background:gray"'),
        new Regex('\\d\\.', NEWLINE, 'div',                        'id="markdown"', '$NUMLIST'),
        new Regex('- ', NEWLINE, 'div',                            'id="markdown"', '• '),
        new Regex('> ', NEWLINE, 'div',                            'id="markdown" style="background:#222;color:white;border-left:10px black solid"', '')
    ]
    console.log(regexList.map(each => {
        return each.exp
    }))
    regexList.forEach((each, index) => {
        raw = each.applyToString(raw)
    })

    return raw.replaceAll(NEWLINE,'\n')

}




