import { numListElement } from './src/types/numlist.mjs'
import { header3Element } from './src/types/header3.mjs'
import { header2Element } from './src/types/header2.mjs'
import { header1Element } from './src/types/header1.mjs'
import { lineElement } from './src/types/line.mjs'
import { dotListElement } from './src/types/dotlist.mjs'
import { quoteElement } from './src/types/quote.mjs'
import { codeBlock, codeBlockElement } from './src/types/codeBlock.mjs'
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
import Regex from './src/lib/Regex.mjs'
import {differentTableElement} from './src/types/differentTable.mjs'
import { textify } from './src/lib/textify.mjs'
import { header4Element } from './src/types/header4.mjs'
import Plugin from './src/lib/Plugin.mjs'
import { tabBlock } from './src/types/tabBlock.mjs'
import { htmlTagElement } from './src/types/htmlTag.mjs'



export function parse(string) {

    const NEWLINE = "\n"
    let raw = ('\n' + string + '\n')
    
    const preprocess = [
        /**ERRO AQUI MEU PARCEIRO  ⇩  (f,l,c)=>"\n```" + c +'```\n'*/
        
        // new Regex("\n(?!\\|)"                           ,"[^#\n]+?\\|[^\n]+"   ,"(?=\n)"               ,(f,l,c)=>{return "\n|"+c+"|"}),  //prepare to accept non-piped tables
        // new Regex("(?!\\`.*?)\n"                        ,""                    ,""                     ,(f,l,c)=>{return NEWLINE}),
        // new Regex(''                                    ,'javascript:'         ,''                     ,()=>textify('/javascript:')),
        // new Regex("<script",".*?","</script>",(f,l,c)=>{return textify(f+c+l)}),
       
    ]
    const posprocess = [
        new Regex('<[^\\!-]+? '                    , ".*?"                 , "(>.*?</.+>|/>)"                  , htmlTagElement),
        codeBlock,
        tabBlock,
        
        new Regex('\\`'                                , ".*?"                 , '\\`'                  , inlineCodeElement),
        new Regex(`(?:${NEWLINE})\\|`                  , `.*?`                 ,`\\|${NEWLINE}(?!\\|)`  , tableElement),
        new Regex('\\!\\[.*?\\]\\('                    , ".*?"                 , "\\)"                  , imageElement),
        
        new Regex('\\[.*?\\]\\('                       , ".*?"                 , "\\)"                  , anchorElement),
        new Regex(`(?:${NEWLINE})#### `                , ".*?"                 , `(?:${NEWLINE})`       , header4Element),
        new Regex(`(?:${NEWLINE})### `                 , ".*?"                 , `(?:${NEWLINE})`       , header3Element),
        new Regex(`(?:${NEWLINE})## `                  , ".*?"                 , `(?:${NEWLINE})`       , header2Element),
        new Regex(`(?:${NEWLINE})# `                   , ".*?"                 , `(?:${NEWLINE})`       , header1Element),
        new Regex(NEWLINE + '(\\&gt;|>)'               , ".*?"                 , NEWLINE                , quoteElement),
        new Regex('(\\[\\s\\]|\\[\\x\\])'              , ".*?"                 ,  ''                    , taskElement),
        new Regex('\\*\\*\\*'                          , `.*?(?!${NEWLINE})`   , `\\*\\*\\*`            , italicBoldElement),
        new Regex('\\*\\*'                             , `.*?(?!${NEWLINE})`   , `\\*\\*`               , boldElement),
        new Regex('\\*'                                , `.*?(?!${NEWLINE})`   , `\\*`                  , italicElement),
        new Regex("("+NEWLINE + '\\s*?\\d\\.)'         , ".*?"                 , `(?=${NEWLINE})`       , numListElement),
        new Regex("("+NEWLINE + "\\s*?\\-)[^\\-]"      , "[^\\*]*?"            , `(?=${NEWLINE})`       , dotListElement),
        new Regex(NEWLINE+'\\* '                       , "[^\\*]*?"            , `(?=${NEWLINE})`       , dotListElement),
        // /**ERRO AQUI ⇩  LEMBRAR DE IMPLEMENTAR PLUGINS ENVES DE DOIS PROCESSOS SEPARADOS*/
        new Regex(`(?= |\\b)_`                           , ".+?"                 , '_(?= |\\b)'             , italicElement),
        new Regex('~~'                                 , ".*?"                 , '~~'                   , scratchedElement),
        new Regex(`-`                                  , "(-)*"                , `--`                   , lineElement),
        new Regex('\\:'                                , "[\\w]+"              , "\\:"                  , emojiElement),
        new Regex(NEWLINE                              , "[\\s]*"              , NEWLINE                , ()=>"<br>"),
    ]
    preprocess.forEach((each, index) => {
        // console.log("Pre-Process: ",each.exp)
        raw = each.applyToString(raw);
    })

    posprocess.forEach((each, index) => {
        console.log("Pos-Process",each.exp)
        raw = each.applyToString(raw);
    })

    return "<div id=\"markdown\" class=\"background\">\n" + raw.replaceAll(NEWLINE, "\n") + "\n</div>"
}