import Plugin from "../lib/Plugin"

function tableElement(first:string, content:string, last:string) {
    let total = first + content + last
    let rawRows = total.split('\n').map(each=>{
        return each.split('|').filter(each=>each!="")
    })
    let isHeader = true
    let columnsCount =rawRows.sort((a,b)=>b.length-a.length)[0].length

    let rows = rawRows.map((row,row_index)=>{
        return row.map((item,item_index)=>{
            if(/^-[-]+-$/.test(item))return isHeader=false
            let attributes = []
            if(item_index == 0)attributes.push("left")
            if(item_index == row.length-1)attributes.push("right")
            if(row_index == 0)attributes.push("top")
            if(row_index == rawRows.length-1)attributes.push("bottom")
            if(!isHeader && Math.round(row_index /2) != row_index/2)attributes.push("pair")
            if(isHeader)attributes.push('header')
            return {value:item,attributes}
        })
        
    })

    let cellsHTML = ''

    rows.forEach(row=>{
        row.forEach(item=>{
            if(!item)return;
            cellsHTML += `<div class="markdown cel ${item.attributes.toString().replaceAll(","," ")}">${item.value}</div>`
        })
      
    })

    return `<div class="markdown table" style="display:grid;grid-template-columns:repeat(${columnsCount},1fr)">${cellsHTML}</div>`

}
export const markdownTable = new Plugin(/(?<!\|)\n\|/, /(.+\|\n\|.+)+?/, /\|\n(?!\|)/, 'table', tableElement)