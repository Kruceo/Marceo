export function codeBlockElement(a,b,content){
    return `<div \
style="white-space:pre-wrap;" \
id="markdown" \
class="code-block">
    ${content
        .replaceAll('.','&#8228;')
        .replaceAll('*',"&ast;")
    }
</div>`
}