import { removeLookahead } from "./util.mjs"

export default class Match {
    constructor(start, content, end) {
        this.content = content
        this.end = end
        this.start = start
    }

    get complete(){
        return `${this.start}${this.content}${this.end}`
    }
    /**
     * Gets a collection of matchs, normalized with start, content and end.
     * @param {RegExp} initRegExp 
     * @param {RegExp} contentRegExp 
     * @param {RegExp} endRegExp 
     * @returns {Match[]}
     */
    static getFromText(initRegExp, contentRegExp, endRegExp,text) {

        const fullR = new RegExp( `(${initRegExp.source})(${contentRegExp.source})(${endRegExp.source})`, `g${contentRegExp.flags}${initRegExp.flags}${endRegExp.flags}`)
        const startR = new RegExp(`^(${initRegExp.source})`)
        const endR = new RegExp(`${endRegExp.source}$`)

        let matches = text.match(fullR)
        if (matches && matches.length) {
            matches = matches.map(each => {
                console.log(each)
                const s = each.match(removeLookahead(startR,true))
                const e = each.match(removeLookahead(endR,true))
                const c = each.slice(s.index + s[0].length,e.index)
                
                return new Match(
                    s[0].replace('\n',''),
                    c,
                    e[0].replace('\n','')
                    )
            })
        }
        return matches??[]
    }
}