import Plugin from "../lib/Plugin";

function codeBlockElement(start: string, content: string, end: string) {
    let lang = start.slice(3)
    // if(!hljs.getLanguage(lang))lang = "bash"

    const cnt = content.replace(/^[\n]+|[\n]+$/g, '')

    // return `<div class="markdown code-block"><div class="language">${lang}</div><code class="code">${content.replace(/^(\n)+|(\n)+$/g, "")}</code></div>`

    return `\
<div class="markdown code-block">\
<div class="markdown language">${lang}</div>\
<code class="markdown code">\
${escapeHtml(content)}
</code>\
</div>`
}

export const codeBlock = new Plugin(/```\w+/, /.+?/s, /```/, 'codeblock', codeBlockElement, { hideContent: true })


function escapeHtml(input: String): String {
    return input
        .replaceAll("&", "&amp;")  // Deve ser substituído primeiro
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#39;")
        .replaceAll(" ", "&nbsp;")  // Espaço não quebra
        .replaceAll("©", "&copy;")  // Símbolo de copyright
        .replaceAll("®", "&reg;")   // Símbolo de marca registrada
        .replaceAll("€", "&euro;")  // Símbolo do euro
        .replaceAll("£", "&pound;") // Símbolo da libra
        .replaceAll("¥", "&yen;")   // Símbolo do iene
        .replaceAll("¢", "&cent;")  // Símbolo de centavo
        .replaceAll("«", "&laquo;") // Aspas angulares esquerdas
        .replaceAll("»", "&raquo;") // Aspas angulares direitas
        .replaceAll("±", "&plusmn;") // Mais ou menos
}