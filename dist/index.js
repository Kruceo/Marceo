'use strict';

/**
 * Removes lookahead regular expressions.
 * @example removeLookahead(/(?<=ex)am(?=ple)/) // => /example/
 * removeLookahead(/(?<=ex)am(?=ple)/,true) // => /am/
 */
function removeLookahead(regExp, includeContent) {
    let source = regExp.source;
    source = source.replace(/\(\?\<\=.+?\)/g, (text) => {
        if (includeContent)
            return '';
        return text.slice(4, text.length - 1);
    });
    source = source.replace(/\(\?(\=|\!).+?\)/g, (text) => {
        if (includeContent)
            return '';
        return text.slice(3, text.length - 1);
    });
    return new RegExp(source);
}

class Match {
    content;
    start;
    end;
    constructor(start, content, end) {
        this.content = content;
        this.end = end;
        this.start = start;
    }
    get complete() {
        return `${this.start}${this.content}${this.end}`;
    }
    /**
     * Gets a collection of matchs, normalized with start, content and end.
     */
    static getFromText(initRegExp, contentRegExp, endRegExp, text) {
        const fullR = new RegExp(`(${initRegExp.source})(${contentRegExp.source})(${endRegExp.source})`, `g${contentRegExp.flags ?? ""}${initRegExp.flags ?? ""}${endRegExp.flags ?? ""}`);
        const startR = new RegExp(`^(${initRegExp.source})`);
        const endR = new RegExp(`${endRegExp.source}$`);
        let matches = text.match(fullR);
        let convertedMatches = [];
        if (matches && matches.length) {
            convertedMatches = matches.map(each => {
                const s = each.match(removeLookahead(startR, true));
                const e = each.match(removeLookahead(endR, true));
                if (!s || !e) {
                    //|_> Returns only content
                    return new Match('', each, '');
                }
                if (typeof (s.index) != "number" || typeof (e.index) != "number")
                    //|_> Returns only content
                    return new Match('', each, '');
                const c = each.slice(s.index + s[0].length, e.index);
                const newItem = new Match(s[0].replace('\n', ''), c, e[0].replace('\n', ''));
                return newItem;
            });
        }
        return convertedMatches ?? [];
    }
}

class Plugin {
    /**
     * Add's a new normalized function for the software;
     */
    matches;
    start;
    content;
    end;
    name;
    htmlHandle;
    symbol;
    options;
    constructor(start, content, end, name, htmlHandler, options) {
        this.options = { hideContent: false, ...options };
        this.matches = [];
        this.start = start;
        this.content = content;
        this.end = end;
        this.name = name;
        this.htmlHandle = htmlHandler;
        this.symbol = '@';
    }
    /**
     * Match the text and sinalize all to after replace then.
     */
    identifyText(text) {
        let newText = text;
        const matches = Match.getFromText(this.start, this.content, this.end, text);
        let identifiedMatches = matches.map((each, index) => {
            const id = `${this.symbol}${this.name}-${index}${this.symbol}`;
            const newItem = { complete: each.complete, content: each.content, start: each.start, end: each.end, id };
            newText = newText.replace(each.complete, `\
${id}\
${this.options.hideContent ? "" : each.content}\
${id}`);
            return newItem;
        });
        this.matches = identifiedMatches;
        return newText;
    }
    /**
     * Replace pre-sinalized text with the plugin handler.
     */
    replaceSymbols(text) {
        let newText = text;
        this.matches.forEach(each => {
            const regex = new RegExp(`${each.id}.*${each.id}`, 's');
            const match = newText.match(regex);
            if (!match)
                return console.error("Errored");
            const content = this.options.hideContent ? each.content : match[0].replaceAll(each.id, '');
            const htmlElement = this.htmlHandle(each.start, content, each.end);
            newText = newText.replace(regex, htmlElement);
        });
        return newText;
    }
}

function anchorElement(start, content) {
    return `<a class="markdown anchor" href="${content}">${start.slice(1, start.length - 2)}</a>`;
}
const anchor = new Plugin(/(?<!\!)(\[.+?\])\(/, /.+?/, /\)/, 'anchor', anchorElement);

function boldElement(start, content) {
    return `<strong class="markdown bold">${content}</strong>`;
}
const bold = new Plugin(/\*\*/, /.+?/, /\*\*/, 'bold', boldElement);

function codeBlockElement(start, content, end) {
    return `<div class="markdown code-block"><div class="language">${start.slice(3)}</div><div class="code">${content}</div></div>`;
}
const codeBlock = new Plugin(/```\w+/, /.+?/s, /```/, 'codeblock', codeBlockElement, { hideContent: true });

function dotlistElement(start, content, last) {
    const level = Math.floor(start.length / 4);
    return `<p class="markdown list-dot level${level}">${content}</p>`;
}
const dotlist = new Plugin(/\n(\ )*- /, /.+?/, /(?=\n)/, 'dotlist', dotlistElement);

const header5 = new Plugin(/(\n)##### /, /.+?/, /\n/, 'header5', (start, content, end) => `<h5 class="markdown header5">${content}</h5>\n`);
const header4 = new Plugin(/(\n)#### /, /.+?/, /\n/, 'header4', (start, content, end) => `<h4 class="markdown header4">${content}</h4>\n`);
const header3 = new Plugin(/(\n)### /, /.+?/, /\n/, 'header3', (start, content, end) => `<h3 class="markdown header3">${content}</h3>\n`);
const header2 = new Plugin(/(\n)## /, /.+?/, /\n/, 'header2', (start, content, end) => `<h2 class="markdown header2">${content}</h2>\n`);
const header1 = new Plugin(/(\n)# /, /.+?/, /\n/, 'header1', (start, content, end) => `<h1 class="markdown header1">${content}</h1>\n`);

function imageElement(start, content, end) {
    return `<img src="${content}" title="${start.slice(2, start.length - 2)}"></img>`;
}
const image = new Plugin(/\!\[.+?\]\(/, /.+?/, /\)/, 'anchor', imageElement);

// import { textify } from "../lib/textify.mjs";
function inlineCodeElement(first, content, last) {
    return `<span class="markdown inline-code">${content}</span>`;
}
const inlineCode = new Plugin(/`/, /.+?/, /`/, "inlinecode", inlineCodeElement);

const italic = new Plugin(/\*/, /.+?/, /\*/, 'italic  ', (start, content, end) => `<i class="markdown italic">${content}</i>`);
const unItalic = new Plugin(/_/, /.+?/, /_/, 'unitalic', (start, content, end) => `<i class="markdown italic">${content}</i>`);

const line = new Plugin(/(?<=\n)_/, /(_)+/, /_(?=\n)/, 'line    ', () => `<div class="markdown line"></div>`);

const numlist = new Plugin(/\n\d\./, /.+?/, /\n/, 'numblist', (start, content, end) => `<p class="markdown numlist">${content}</p>`);

function quoteElement(first, content, last) {
    return `<div class="markdown quote">${content}</div>`;
}
const quote = new Plugin(/>/, /.+?/, /\n/, "quote", quoteElement);

function scratchedElement(first, content, last) {
    return `<span class="markdown scratched" style="text-decoration:line-through">${content}</span>`;
}
const scratched = new Plugin(/~~/, /.*?/, /~~/, "scratched", scratchedElement);

function taskElement(first, content, last) {
    const checked = content == 'x';
    return `<span class="markdown task ${checked ? 'checked' : ''}"><div id="markdown" class="inner"></div></span>`;
}
const task = new Plugin(/\[/, /(x| )/, /\]/, 'task', taskElement);

const markdownTable = new Plugin(/(?<!\|)\n\|/, /(.+\|\n\|.+)+?/, /\|\n(?!\|)/, 'table', differentTable);
function differentTable(first, content, last) {
    let total = first + content + last;
    let rawRows = total.split('\n').map(each => {
        return each.split('|').filter(each => each != "");
    });
    let isHeader = true;
    let rows = rawRows.map((row, row_index) => {
        return row.map((item, item_index) => {
            if (/^-[-]+-$/.test(item))
                return isHeader = false;
            let attributes = [];
            if (item_index == 0)
                attributes.push("left");
            if (item_index == row.length - 1)
                attributes.push("right");
            if (row_index == 0)
                attributes.push("top");
            if (row_index == rawRows.length - 1)
                attributes.push("bottom");
            if (!isHeader && Math.round(row_index / 2) != row_index / 2)
                attributes.push("pair");
            if (isHeader)
                attributes.push('header');
            return { value: item, attributes };
        });
    });
    let head = "";
    let body = "";
    rows.forEach(row => {
        let isHeader = true;
        let rowContent = "";
        row.forEach(each => {
            if (!each)
                return;
            isHeader = each.attributes.includes("header");
            rowContent += `<${isHeader ? "th" : "td"} class="markdown cel ${each.attributes.toString().replaceAll(",", " ")}">${each.value}</${isHeader ? "th" : "td"}>`;
        });
        if (isHeader)
            head += `<tr class="markdown row header">${rowContent}</tr>`;
        else
            body += `<tr class="markdown row">${rowContent}</tr>`;
    });
    return `<table class="markdown table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}
console.log(differentTable('\n|', "\n1|2|\n|---|---|\n|3|4\n", "|\n"));

var collections = [
    header5,
    header4,
    header3,
    header2,
    header1,
    dotlist,
    bold,
    italic,
    line,
    unItalic,
    numlist,
    markdownTable,
    anchor,
    image,
    codeBlock,
    quote,
    inlineCode,
    task,
    scratched,
];
function parse(text) {
    let raw = ('\n' + text + '\n');
    const ordenedCollections = collections.sort((a, b) => (a.options.hideContent ? 0 : 1) - (b.options.hideContent ? 0 : 1));
    ordenedCollections.forEach(plugin => {
        raw = plugin.identifyText(raw);
    });
    ordenedCollections.forEach(plugin => {
        raw = plugin.replaceSymbols(raw);
    });
    return `<div class=\"markdown background\">${raw}</div>`;
}

exports.Plugin = Plugin;
exports.collections = collections;
exports.parse = parse;
