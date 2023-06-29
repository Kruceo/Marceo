import { textify } from "../lib/textify.mjs"

export function differentTableElement(l,f,content){
    // console.log(content)
    return "<span style='border:#000 1px solid; white-space:pre-wrap '>" +
    "<span style='background:red;'>"+  textify (l[0].replaceAll('\n','\\n')    )+"</span>"+ 
    "<span style='background:blue'>"+  textify (content.replaceAll('\n','\\n') )+"</span>" + 
    "<span style='background:green'>"+ textify (f[0].replaceAll('\n','\\n')    )+"</span>" + 
    "</span>"
}