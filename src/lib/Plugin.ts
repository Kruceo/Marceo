import Match from "./Match"

interface HtmlHandler {
    (start: string, content: string, end: string): string;
}

interface identifiedMatch extends Match {
    id: string,
    hiddenContent?: boolean
}

interface pluginOptions {
    hideContent: boolean
}

export default class Plugin {
    /**
     * Add's a new normalized function for the software;
     */
    matches: identifiedMatch[]
    start: RegExp
    content: RegExp
    end: RegExp
    name: string
    htmlHandle: HtmlHandler
    symbol: string
    options: pluginOptions;
    constructor(start: RegExp, content: RegExp, end: RegExp, name: string, htmlHandler: HtmlHandler, options?: pluginOptions) {
        this.options = { hideContent: false, ...options }
        this.matches = []
        this.start = start
        this.content = content
        this.end = end
        this.name = name
        this.htmlHandle = htmlHandler
        this.symbol = '@'
    }
    /**
     * Match the text and sinalize all to after replace then.
     */
    identifyText(text: string) {
        let newText = text
        const matches = Match.getFromText(this.start, this.content, this.end, text)
        let identifiedMatches = matches.map((each, index) => {
            const id = `${this.symbol}${this.name}-${index}${this.symbol}`
            const newItem: identifiedMatch = { complete: each.complete, content: each.content, start: each.start, end: each.end, id }

            newText = newText.replace(each.complete, `\
${id}\
${this.options.hideContent ? "":each.content}\
${id}`)
            return newItem
        })
        this.matches = identifiedMatches
        return newText
    }
    /**
     * Replace pre-sinalized text with the plugin handler.
     */
    replaceSymbols(text: string) {
        let newText = text
        this.matches.forEach(each => {
            const regex = new RegExp(`${each.id}.*${each.id}`, 's')
            const match = newText.match(regex)
            if (!match) return console.error("Errored");
            
            const content = this.options.hideContent ? each.content : match[0].replaceAll(each.id, '')
            const htmlElement = this.htmlHandle(each.start,content,each.end)
            newText = newText.replace(regex, htmlElement)
        })
        return newText

    }
}