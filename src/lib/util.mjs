/**
 * 
 * @param {RegExp} regExp 
 * @param {boolean} includeStrings 
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
    return inputString.split('').map(function(char) {
      return '&#' + char.charCodeAt(0) + ';';
    }).join('');
  }