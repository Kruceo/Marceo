export function textify(string){
    const toChange = "#avscript:_|`-^*.()<>\"\'"
    let newString = string + ''
    toChange.split('').forEach(each=>{
        newString = newString.replaceAll(each,"&#x"+each.charCodeAt(0).toString(16)+";")
    })
    return newString
}