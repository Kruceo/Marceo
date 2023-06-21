import fs from 'fs'
import { numListElement } from './src/types/numlist.mjs'
import { header3Element } from './src/types/header3.mjs'
import { header2Element } from './src/types/header2.mjs'
import { header1Element } from './src/types/header1.mjs'
import { lineElement } from './src/types/line.mjs'
import { dotListElement } from './src/types/dotlist.mjs'
import { quoteElement } from './src/types/quote.mjs'
import { codeBlockElement } from './src/types/codeBlock.mjs'
import { boldElement } from './src/types/bold.mjs'
import { italicElement } from './src/types/italic.mjs'
import { italicBoldElement } from './src/types/italicBold.mjs'
import { inlineCodeElement } from './src/types/inlineCode.mjs'
class Regex {
    constructor(firstSymbol, lastSymbol,callback) {
        this.firstSymbol = firstSymbol
        this.lastSymbol = lastSymbol
        this.callback = callback
    }

    get exp() {
        return new RegExp(this.firstSymbol + '.*?' + this.lastSymbol, 'g')
    }

    applyToString(string) {
        let newString = string + ''

        const match = newString.match(this.exp)
        if (match)
            match.forEach((each, index) => {
                let literalFirstSymbol = each.match(new RegExp(this.firstSymbol))
                let literalLastSymbol = each.match(new RegExp(this.lastSymbol))
                const content = each.slice(literalFirstSymbol[0].length, each.length - literalLastSymbol[0].length)
                
                console.log('first   |',literalFirstSymbol[0])
                console.log('last    |',literalLastSymbol[0])
                console.log('content |',content)
                console.log('--------------------------------')
                const result = this.callback(literalFirstSymbol,literalLastSymbol,content) +'\n\n'
                newString = newString.replace(each,result)

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
    .replaceAll('<script','&lt;script;')
    .replaceAll('/script>','&gt;')
    .replaceAll('javascript:','JavaScript%20&#58;')
    /**
     * All that uses NEWLINE like termination, runs first in the array,columns runs first than all
     */
    const regexList = [
        
        new Regex(NEWLINE+'\\`\\`\\`.*?'+NEWLINE, '\\`\\`\\`' ,codeBlockElement), 
        new Regex('\\`', '\\`'                        ,inlineCodeElement),
        new Regex(NEWLINE+'### ', NEWLINE                     ,header3Element), 
        new Regex(NEWLINE+'## ', NEWLINE                      ,header2Element), 
        new Regex(NEWLINE+'# ', NEWLINE                       ,header1Element),
        new Regex(NEWLINE+'---', NEWLINE                      ,lineElement),
        new Regex(NEWLINE+'\\d\\.', NEWLINE                   ,numListElement),  
        new Regex(NEWLINE+'- ', NEWLINE                       ,dotListElement), 
        new Regex('\\*\\*\\*', '\\*\\*\\*'            ,italicBoldElement),
        new Regex('\\*\\*', '\\*\\*'                  ,boldElement),
        new Regex('\\*', '\\*'                        ,italicElement),
        new Regex('_', '_'                            ,italicElement),
        new Regex(NEWLINE+'(\\&gt;|>)',  NEWLINE               ,quoteElement),
        

        // `\\|${NEWLINE}`
        
        
        // ,'div', 'id="markdown" style="background:red"'),
    ]

    regexList.forEach((each, index) => {
        raw = each.applyToString(raw)
    })
    return raw.replaceAll(NEWLINE,'<br>')

}