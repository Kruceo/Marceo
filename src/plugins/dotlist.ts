import Plugin from "../lib/Plugin";

function dotlistElement(start:string,content:string,last:string){
    // return "({\n" + start + content + "\n})"
    const all = "\n"+(start + content).trim()
    let result = all
    let ma = all.match(/\n((-|\d\.) .+)/g)
    if(ma){
        if(/\n\d\. /.test(ma[0])){
            result = "\n<ol>" + result +"</ol>\n"
        }
        else result = "\n<ul>" + result + "</ul>\n"

        ma.forEach(matched=>{
            result = result.replace(matched,`\n<li>${matched.substring(3)}</li>`)
        })
    }
    let spaces = 4
    let customRegex = ()=>RegExp(`\n( ){${spaces}}(-) `,'g')

    while(result.match(customRegex())){
        result = result.replace(customRegex(),"\n- ")
        spaces+=4
        if(spaces>20)break;
        let identified = dotlist.identifyText(result)
        let replaced = dotlist.replaceSymbols(identified)
        result = replaced
    }

    return result
}

export const dotlist = new Plugin(
    /(\n)*?/,    
    /(\n( )*(-|\d\.) .+)+/,
    /\n(\ )*(?!-)(?!\d\.)/, 
    'dotlist',dotlistElement )