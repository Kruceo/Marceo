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
    constructor(start, content, end, name, htmlHandler) {
        this.matches = []
        this.start = start
        this.content = content
        this.end = end
        this.name = name
        this.htmlHandle = htmlHandler
        this.symbol = '@'
    }

    identifyText(text) {
        let newText = text
        let matches = Match.getFromText(this.start, this.content, this.end, text)
        matches.map((each,index) => {
            const id = `${this.symbol}${this.name}-${index}${this.symbol}`
            each.id = id
            newText = newText.replace(each.complete, `${id}${each.content}${id}`)
        })
        this.matches = matches
        return newText
    }
    replaceSymbols(text) {
        let newText = text
        this.matches.forEach(each => {
            const regex = new RegExp(`${each.id}.+${each.id}`,'s')
            const match = newText.match(regex)
            console.log(regex,match)
            if(!match)return console.error("Errored");
            
            const htmlElement = this.htmlHandle(each.start, match[0].replaceAll(each.id,''), each.end)
            newText = newText.replace(regex , htmlElement)
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