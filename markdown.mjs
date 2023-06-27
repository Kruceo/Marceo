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
import { imageElement } from './src/types/image.mjs'
import { anchorElement } from './src/types/anchor.mjs'
import { emojiElement } from './src/types/emoji.mjs'
import { scratchedElement } from './src/types/scratched.mjs'
import { taskElement } from './src/types/task.mjs'
import { tableElement } from './src/types/table.mjs'
import { differentTableElement } from './src/types/differentTable.mjs'
import { textify } from './src/lib/textify.mjs'

class Regex {
    constructor(firstSymbol,content, lastSymbol, callback) {
        this.firstSymbol = firstSymbol
        this.content = content
        this.lastSymbol = lastSymbol
        this.callback = callback
    }

    get exp() {
        return new RegExp(this.firstSymbol + this.content + this.lastSymbol, 'g')
    }

    applyToString(string) {
        let newString = string + ''

        const match = newString.match(this.exp)
        if (match)
            match.forEach((each, index) => {
                let literalFirstSymbol = each.match(new RegExp(this.firstSymbol))
                let literalLastSymbol = each.match(new RegExp(this.lastSymbol))
               
                let content = each.slice(literalFirstSymbol[0].length, each.length - literalLastSymbol[0].length)
                const result = this.callback(literalFirstSymbol, literalLastSymbol, content)
                newString = newString.replace(each, result)

                console.log('index   |', index)
                console.log('exp     |', this.exp)
                console.log('first   |', literalFirstSymbol[0])
                console.log('last    |', literalLastSymbol[0])
                console.log('content |', content)
                console.log('input   |', each)
                console.log('result  |', result.replaceAll('\n', ''))
                console.log('--------------------------------')
            })
        return newString
    }
}

export function parse(string) {
    const NEWLINE = "@NEWLINE@"
    let raw = ('\n' + string + '\n')
        // .replace(/(\- |\d\.).*?\n/g,(match)=>match.replace(/\n/,NEWLINE +""+ NEWLINE))
        .replace(/\n(?!\|).*?\|.*?(?=\n)/g,(m)=>{
            return m.replace('\n','\n|') + "|"
        })
        .replaceAll('\n',NEWLINE)
        .replaceAll('<script', '&lt; script')
        .replaceAll('</script', '&gt; script')
        .replaceAll('javascript:', textify('JavaScript:'))
    /**
     * All that uses NEWLINE like termination, runs first in the array,columns runs first than all
     */
    const regexList = [
        new Regex(NEWLINE + '\\`\\`\\`.*?' + NEWLINE   , ".*?"                 , '\\`\\`\\`'                           , codeBlockElement),
        new Regex('\\`'                                , ".*?"                 , '\\`'                                 , inlineCodeElement),
        new Regex(`(?:${NEWLINE})\\|`                  , `.*?`                 ,`\\|${NEWLINE}(?!\\|)`                 , tableElement),
        new Regex('\\!\\[.*?\\]\\('                    , ".*?"                 , "\\)"                                 , imageElement),
        new Regex('\\[.*?\\]\\('                       , ".*?"                 , "\\)"                                 , anchorElement),
        new Regex(`(?:${NEWLINE})### `                 , ".*?"                 , `(?:${NEWLINE})`                      , header3Element),
        new Regex(`(?:${NEWLINE})## `                  , ".*?"                 , `(?:${NEWLINE})`                      , header2Element),
        new Regex(`(?:${NEWLINE})# `                   , ".*?"                 , `(?:${NEWLINE})`                      , header1Element),
        new Regex(NEWLINE + '(\\&gt;|>)'               , ".*?"                 , NEWLINE                               , quoteElement),
        new Regex('(\\[\\s\\]|\\[\\x\\])'              , ".*?"                 ,  ''                                   , taskElement),
        new Regex('\\*\\*\\*'                          , `.*?(?!${NEWLINE})`   , `\\*\\*\\*`                         , italicBoldElement),
        new Regex('\\*\\*'                             , `.*?(?!${NEWLINE})`   , `\\*\\*`                            , boldElement),
        new Regex('\\*'                                , `.*?(?!${NEWLINE})`   , `\\*`                               , italicElement),
        new Regex("("+NEWLINE + '\\s*?\\d\\.)'         , ".*?"                 , `(?=${NEWLINE})`                      , numListElement),
        new Regex("("+NEWLINE + "\\s*?\\-)[^\\-]"      , "[^\\*]*?"            , `(?=${NEWLINE})`                      , dotListElement),
        new Regex(NEWLINE+'\\* '                       , "[^\\*]*?"            , `(?=${NEWLINE})`                      , dotListElement),
        new Regex('_'                                  , ".*?"                 , '\\_'                                 , italicElement),
        new Regex('~~'                                 , ".*?"                 , '~~'                                  , scratchedElement),
        new Regex('\\:'                                , "[\\w]+"              , "\\:"                                 , emojiElement),
        new Regex(`-`                                  , "(-)*"                , `--`                                  , lineElement),
        new Regex(NEWLINE                              , "[\\s]*"              , NEWLINE                               , ()=>"<br>"),
       
    ]
    regexList.forEach((each, index) => {
        console.log("Running",each.exp)
        raw = each.applyToString(raw);
    })

    return "<div id=\"markdown\" class=\"background\">\n" + raw.replaceAll(NEWLINE, "<br>") + "\n</div>"

}