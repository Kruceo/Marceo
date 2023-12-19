/**
 * Removes lookahead regular expressions.
 * @param {RegExp} regExp 
 * @param {boolean} includeContent 
 * @example removeLookahead(/(?<=ex)am(?=ple)/) // => /example/
 * removeLookahead(/(?<=ex)am(?=ple)/,true) // => /am/
 */
export function removeLookahead(regExp,includeContent){
    let source = regExp.source

    source = source.replace(/\(\?\<\=.+?\)/g,(text)=>{
        if(includeContent) return ''
        return text.slice(4,text.length-1)
    })
    source = source.replace(/\(\?(\=|\!).+?\)/g,(text)=>{
        if(includeContent) return ''
        return text.slice(3,text.length-1)
    })
    return new RegExp(source)
}

export function textify(inputString) {
    return inputString.split('').reduce((acum,next)=> {
      return acum + '&#' + next.charCodeAt(0) + ';'
    },'');
  }