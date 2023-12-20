import { removeLookahead } from "./util"

export default class Match {
    content: string
    start: string
    end: string
    constructor(start: string, content: string, end: string) {
        this.content = content
        this.end = end
        this.start = start
    }

    get complete() {
        return `${this.start}${this.content}${this.end}`
    }
    /**
     * Gets a collection of matchs, normalized with start, content and end.
     */
    static getFromText(initRegExp: RegExp, contentRegExp: RegExp, endRegExp: RegExp, text: string) {
        const fullR = new RegExp(`(${initRegExp.source})(${contentRegExp.source})(${endRegExp.source})`, `g${contentRegExp.flags ?? ""}${initRegExp.flags ?? ""}${endRegExp.flags ?? ""}`)
        const startR = new RegExp(`^(${initRegExp.source})`)
        const endR = new RegExp(`${endRegExp.source}$`)

        let matches = text.match(fullR)
        let convertedMatches: Match[] = []

        if (matches && matches.length) {
            convertedMatches = matches.map(each => {
                const s = each.match(removeLookahead(startR, true))
                const e = each.match(removeLookahead(endR, true))
                if (!s || !e) {
                    //|_> Returns only content
                    return new Match('', each, '');
                }
                if (typeof (s.index) != "number" || typeof (e.index) != "number")
                    //|_> Returns only content
                    return new Match('', each, '');

                const c = each.slice(s.index + s[0].length, e.index)
                const newItem = new Match(
                    s[0].replace('\n', ''),
                    c,
                    e[0].replace('\n', ''))

                return newItem
            })
        }
        return convertedMatches ?? []
    }
}