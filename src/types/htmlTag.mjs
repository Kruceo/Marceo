import { textify } from "../lib/textify.mjs"

export function htmlTagElement(first,last,content){
    const attributes = (" "+content+" ").match(/(?= )*?.+?=.+?(?= )+/g)
    let newContent = content + ''

    attributes.forEach(element => {
        let value = element.split('=')[1]
        value= value.slice(1,value.length-1)
        newContent = newContent.replace(value,textify(value))
    });
    return first[0] + newContent + last[0]
}