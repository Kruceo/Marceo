import Plugin from "../lib/Plugin.mjs";

export const codeBlock = new Plugin(/```\w+/, /.+?/s, /```/, 'codeblock', (start, content, end) => `<div class="markdown code-block"><div class="language">${start.slice(3)}</div><div class="code">${content}</div></div>`)