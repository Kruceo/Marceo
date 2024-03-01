import Plugin from "../lib/Plugin"

function htmlElement(start: string, content: string, end: string) {
    const htmlAll = start + content + end
    const htmlTag = htmlAll.match(/<\w+/)[0].replace(/<|>/g, '')
    const htmlContent = htmlAll.match(/(?<=\>).*(?=\<\/)/s) ?? [null]
    const permitedAttributes = ['src', 'href', 'srcset','alt','title']
    const attrRaw = htmlAll.match(/<.+?>/)
    let attributes: string[][] = []
    if (attrRaw) {
        attributes = attrRaw[0].replace(/<|>|\/>/g, '').split(" ").map(each => each.split("="))
        //filter the attributes
        attributes = attributes.filter(each => permitedAttributes.includes(each[0]) && each[1] && !each[1].includes("javascript"))
    }

    const acumulatedAttr = attributes.reduce((acum, next) => `${acum} ${next[0]}=${next[1]}`, '')
    if (!htmlContent[0]) return `<${htmlTag} ${acumulatedAttr}/>`
    return `<${htmlTag} ${acumulatedAttr}>
    ${htmlContent[0]}
    </${htmlTag}>`
}

export const html = new Plugin(/\<\w+?.*?\>/s, /.*?/s, /<\/\w+?>/s, 'html', htmlElement, { hideContent: true })
export const closedHtml = new Plugin(/\<\.*?/s, /[^>]*?/, /\/>/s, 'closedhtml', htmlElement, { hideContent: true })