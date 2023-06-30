export function idfy(string) {
    let res = ''
    const match = string.match(
        /(\b|[^ \*_`"']).+(\b|[^ \*_`"'])/
    )
    if (match) {
        res = match[0].replace(/ ( )*/g,'-')
    }
    return res
}