import Plugin from "../lib/Plugin";
import hljs from 'highlight.js';
// import javascript from 'highlight.js/lib/languages/javascript';

function codeBlockElement(start: string, content: string, end: string) {
    let lang = start.slice(3)
    if(!hljs.getLanguage(lang))lang = "bash"

    const cnt = content.replace(/^[\n]+|[\n]+$/g,'')

    // return `<div class="markdown code-block"><div class="language">${lang}</div><code class="code">${content.replace(/^(\n)+|(\n)+$/g, "")}</code></div>`

        return `\
<div class="markdown code-block">\
<div class="markdown language">${lang}</div>\
<code class="markdown code">\
${hljs.highlight(cnt, { language: lang }).value}\
</code>\
</div>`
}

export const codeBlock = new Plugin(/```\w+/, /.+?/s, /```/, 'codeblock', codeBlockElement, { hideContent: true })