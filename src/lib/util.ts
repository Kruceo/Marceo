/**
 * Removes lookahead regular expressions.
 * @example removeLookahead(/(?<=ex)am(?=ple)/) // => /example/
 * removeLookahead(/(?<=ex)am(?=ple)/,true) // => /am/
 */
export function removeLookahead(regExp: RegExp, includeContent: boolean) {
    let source = regExp.source

    source = source.replace(/\(\?\<\=.+?\)/g, (text) => {
        if (includeContent) return ''
        return text.slice(4, text.length - 1)
    })
    source = source.replace(/\(\?(\=|\!).+?\)/g, (text) => {
        if (includeContent) return ''
        return text.slice(3, text.length - 1)
    })
    return new RegExp(source)
}

export function textify(inputString: string) {
    return inputString.split('').reduce((acum, next) => {
        return acum + '&#' + next.charCodeAt(0) + ';'
    }, '');
}

export function simpleCode(code: string) {
    return code
        .replace(/\w+(?=\()/g, (c) => "[1231310391230319]" + c + "[1231310391230319]")
        .replace(/(?<=\.)\w+/g, (c) => "[1231310391230312]" + c + "[1231310391230312]")
        .replace(/".+?"/g, (c) => "<span style='color:#c80;'>" + textify( c )+ "</span>")
        .replace(/'.+?'/g, (c) => "<span style='color:#c80;'>" + textify( c )+ "</span>")
        .replace(/\d/g, (c) => "<span style='color:#08c;'>" + textify( c )+ "</span>")

}
