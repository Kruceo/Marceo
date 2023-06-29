export default class Regex {
    constructor(firstSymbol,content, lastSymbol, process) {
        this.firstSymbol = firstSymbol
        this.content = content
        this.lastSymbol = lastSymbol
        this.process = process
    }

    get exp() {
        return new RegExp(this.firstSymbol + this.content + this.lastSymbol, 'gs')
    }

    applyToString(string) {
        let newString = string + ''

        const match = newString.match(this.exp)
        if (match)
            match.forEach((each, index) => {
                let literalFirstSymbol = each.match(new RegExp(this.firstSymbol))
                let literalLastSymbol = each.match(new RegExp(this.lastSymbol))
                let content = each.slice(literalFirstSymbol[0].length, each.length - literalLastSymbol[0].length)
                const result = this.process(literalFirstSymbol, literalLastSymbol, content)
                newString = newString.replace(each, result)

                // console.log('index   |', index)
                // console.log('exp     |', this.exp)
                // console.log('first   |', literalFirstSymbol[0])
                // console.log('last    |', literalLastSymbol[0])
                // console.log('content |', content)
                // console.log('input   |', each)
                // console.log('result  |', result.replaceAll('\n', ''))
                // console.log('--------------------------------')
            })
        return newString
    }
}