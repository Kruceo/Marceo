export function textify(string){
    const toChange = "\\/!_-^*.()#\"\'"
    let newString = string + ''
    toChange.split('').forEach(each=>{
        newString = newString.replaceAll(each,"&#x"+each.charCodeAt(0).toString(16)+";")
    })
    return newString
}