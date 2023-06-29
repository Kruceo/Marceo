import { textify } from "../lib/textify.mjs"

export function differentTableElement(l,f,content,h){

    // console.log(content)
    if(!h)return "\n<span style='border:#000 3px solid; white-space:pre-wrap '>" +"<span style='background:#225'>"+  textify(content.replaceAll('\n','\\n') )+"</span>" + "</span>\n"
    return "\n<span style='border:#000 3px solid; white-space:pre-wrap '>" +
"<span style='background:#522;'>"+  textify(l[0].replaceAll('\n','\\n')    )+"</span>"+ 
"<span style='background:#225'>"+  textify(content.replaceAll('\n','\\n') )+"</span>" + 
"<span style='background:#252'>"+ textify(f[0].replaceAll('\n','\\n')    )+"</span>" + 
"</span>\n"
}