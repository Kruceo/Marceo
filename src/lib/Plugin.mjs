import Match from "./Match.mjs"

export default class Plugin {
    /**
     * 
     * @param {RegExp} start 
     * @param {RegExp} content 
     * @param {RegExp} end 
     * @param {string} symbol 
     * @param {(init:string,content:string,end:string)=>string} htmlHandler 
     */
    constructor(start, content, end, symbol, htmlHandler) {
        this.matches = []
        this.start = start
        this.content = content
        this.end = end
        this.symbol = symbol
        this.htmlHandle = htmlHandler
        this.endSymbol = `@${symbol}end@`
        this.startSymbol = `@${symbol};@`
    }

    identifyText(text) {
        let newText = text
        let matches =  Match.getFromText(this.start, this.content, this.end, text).map(each=>{each.code=Math.random()})
        matches.forEach((each,index) => {
            let replaceable = `${this.startSymbol}${each.content}${this.endSymbol}`
            newText = newText.replace(each.complete, replaceable)
        })
        return newText
    }
    replaceSymbols(text) {
        let newText = text
        const newMatch = Match.getFromText(new RegExp(this.startSymbol), /.+?/, new RegExp(this.endSymbol), newText)
        if (!newMatch) return text
        newMatch.forEach(each => {
            const htmlElement = this.htmlHandle(each.start, each.content, each.end)
            newText = newText.replace(each.complete, htmlElement)
        })
        return newText

    }

    get startsWithNewLine() {
        if (this.start.source.includes("\\n")) return true
        return false
    }
    get endsWithNewLine() {
        if (this.end.source.includes("\\n")) return true
        return false
    }
}