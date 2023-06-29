export function textify(string,change){
    const toChange = change??"#$aeiou:_|`-^*.()[]< >\"\'"
    let newString = string + ''
    toChange.split('').forEach(each=>{
        newString = newString.replaceAll(each,"&#x"+each.charCodeAt(0).toString(16)+";")
    })
    return newString
}