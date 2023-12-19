/**
 * Removes lookahead regular expressions.
 * @param {RegExp} regExp 
 * @param {boolean} includeContent 
 * @example removeLookahead(/(?<=ex)am(?=ple)/) // => /example/
 * removeLookahead(/(?<=ex)am(?=ple)/,true) // => /am/
 */
function removeLookahead(regExp,includeContent){
    let source = regExp.source;

    source = source.replace(/\(\?\<\=.+?\)/g,(text)=>{
        if(includeContent) return ''
        return text.slice(4,text.length-1)
    });
    source = source.replace(/\(\?(\=|\!).+?\)/g,(text)=>{
        if(includeContent) return ''
        return text.slice(3,text.length-1)
    });
    return new RegExp(source)
}

class Match {
    constructor(start, content, end) {
        this.content = content;
        this.end = end;
        this.start = start;
    }

    get complete(){
        return `${this.start}${this.content}${this.end}`
    }
    /**
     * Gets a collection of matchs, normalized with start, content and end.
     * @param {RegExp} initRegExp 
     * @param {RegExp} contentRegExp 
     * @param {RegExp} endRegExp 
     * @returns {Match[]}
     */
    static getFromText(initRegExp, contentRegExp, endRegExp,text) {

        const fullR = new RegExp( `(${initRegExp.source})(${contentRegExp.source})(${endRegExp.source})`, `g${contentRegExp.flags}${initRegExp.flags}${endRegExp.flags}`);
        const startR = new RegExp(`^(${initRegExp.source})`);
        const endR = new RegExp(`${endRegExp.source}$`);

        let matches = text.match(fullR);
        if (matches && matches.length) {
            matches = matches.map(each => {
                console.log(each);
                const s = each.match(removeLookahead(startR,true));
                const e = each.match(removeLookahead(endR,true));
                const c = each.slice(s.index + s[0].length,e.index);
                
                return new Match(
                    s[0].replace('\n',''),
                    c,
                    e[0].replace('\n','')
                    )
            });
        }
        return matches??[]
    }
}

class Plugin {
    /**
     * Add's a new normalized function for the software;
     * @param {RegExp} start 
     * @param {RegExp} content 
     * @param {RegExp} end 
     * @param {string} symbol 
     * @param {(init:string,content:string,end:string)=>string} htmlHandler 
     */
    constructor(start, content, end, name, htmlHandler) {
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
     * @param {string} text 
     * @returns 
     */
    identifyText(text) {
        let newText = text;
        let matches = Match.getFromText(this.start, this.content, this.end, text);
        matches.map((each,index) => {
            const id = `${this.symbol}${this.name}-${index}${this.symbol}`;
            each.id = id;
            newText = newText.replace(each.complete, `${id}${each.content}${id}`);
        });
        this.matches = matches;
        return newText
    }
    /**
     * Replace pre-sinalized text with the plugin handler.
     * @param {string} text 
     * @returns {string}
     */
    replaceSymbols(text) {
        let newText = text;
        this.matches.forEach(each => {
            const regex = new RegExp(`${each.id}.*${each.id}`,'s');
            const match = newText.match(regex);
            console.log(regex,match);
            if(!match)return console.error("Errored");
            
            const htmlElement = this.htmlHandle(each.start, match[0].replaceAll(each.id,''), each.end);
            newText = newText.replace(regex , htmlElement);
        });
        return newText

    }

    get startsWithNewLine() {
        if (this.start.source.includes("\\n")) return true
        return false
    }
    get endsWithNewLine() {
        if (this.end.source.includes("\\n")) return true
        return false
    }
}

const anchor = new Plugin(/(?<!\!)(\[.+?\])\(/, /.+?/, /\)/, 'anchor', (start, content, end) => `<a class="markdown anchor" href="${content}">${start.slice(1, start.length - 2)}</a>`);

const bold = new Plugin(/\*\*/, /.+?/, /\*\*/, 'bold', (start, content, end) => `<span class="markdown bold">${content}</span>`);

const codeBlock = new Plugin(/```\w+/, /.+?/s, /```/, 'codeblock', (start, content, end) => `<div class="markdown code-block"><div class="language">${start.slice(3)}</div><div class="code">${content}</div></div>`);

function dotlistElement(start,content,last){
    const level = Math.floor(start.length/4);

    return `<p>${start}</p><p class="markdown list-dot level${level}">${content}</p>`
}

const dotlist = new Plugin(/\n(\ )*- /, /.+?/, /(?=\n)/, 'dotlist',dotlistElement );

const header5 = new Plugin(/(\n)##### /, /.+?/, /\n/, 'header5', (start, content, end) => `<h5 class="markdown header5">${content}</h5>\n`);
const header4 = new Plugin(/(\n)#### /, /.+?/, /\n/, 'header4', (start, content, end) => `<h4 class="markdown header4">${content}</h4>\n`);
const header3 = new Plugin(/(\n)### /, /.+?/, /\n/, 'header3', (start, content, end) => `<h3 class="markdown header3">${content}</h3>\n`);
const header2 = new Plugin(/(\n)## /, /.+?/, /\n/, 'header2', (start, content, end) => `<h2 class="markdown header2">${content}</h2>\n`);
const header1 = new Plugin(/(\n)# /, /.+?/, /\n/, 'header1', (start, content, end) => `<h1 class="markdown header1">${content}</h1>\n`);

function imageElement(start,content,end){
    return `<img src="${content}" title="${start.slice(2,start.length-2)}"></img>`
}

const image = new Plugin(/\!\[.+?\]\(/, /.+?/, /\)/, 'anchor',imageElement);

// import { textify } from "../lib/textify.mjs";

function inlineCodeElement(first, content, last) {
    return `<span class="markdown inline-code">${content}</span>`
}

const inlineCode = new Plugin(/`/,/.+?/,/`/,"inlinecode", inlineCodeElement);

const italic = new Plugin(/\*/, /.+?/, /\*/, 'italic  ', (start, content, end) => `<span class="markdown italic">${content}</span>`);

const unItalic = new Plugin(/_/, /.+?/, /_/, 'unitalic', (start, content, end) => `<span class="markdown italic">${content}</span>`);

const line =  new Plugin(/\n_/, /_/, /_\n/, 'line    ', (start, content, end) => `<div class="markdown line"/>`);

const numlist = new Plugin(/\n\d\./, /.+?/, /\n/, 'numblist', (start, content, end) => `<p class="markdown numlist">${content}</p>`);

function quoteElement(first, content, last) {
    return `<div class="markdown quote">${content}</div>`
}

const quote = new Plugin(/>/,/.+?/,/\n/,"quote",quoteElement);

function scratchedElement(first, content, last) {
    return `<span class="markdown scratched" style="text-decoration:line-through">${content}</span>`
}

const scratched = new Plugin(/~~/, /.*?/, /~~/,"scratched", scratchedElement);

function tableElement(first, content, last) {
    let total = first + content + last;
    let rows = total.split('\n').map(each=>{
        return each.split('|').filter(each=>each!="")
    });
    let isHeader = true;
    let columnsCount = rows.sort((a,b)=>b.length-a.length)[0].length;

    rows = rows.map((row,row_index)=>{
        return row.map((item,item_index)=>{
            if(/^-[-]+-$/.test(item))return isHeader=false
            let attributes = [];
            if(item_index == 0)attributes.push("left");
            if(item_index == row.length-1)attributes.push("right");
            if(row_index == 0)attributes.push("top");
            if(row_index == rows.length-1)attributes.push("bottom");
            if(!isHeader && Math.round(row_index /2) != row_index/2)attributes.push("pair");
            if(isHeader)attributes.push('header');
            return {value:item,attributes}
        })
        
    });

    let cellsHTML = '';

    rows.forEach(row=>{
        row.forEach(item=>{
            if(!item)return;
            cellsHTML += `<div class="markdown cel ${item.attributes.toString().replaceAll(","," ")}">${item.value}</div>`;
        });
      
    });

    return `<div class="markdown table" style="display:grid;grid-template-columns:repeat(${columnsCount},1fr)">${cellsHTML}</div>`

}
const table = new Plugin(/(?<!\|)\n\|/, /(.+\|\n\|.+)+?/, /\|\n(?!\|)/, 'table', tableElement);

function taskElement(first, content, last) {
    const checked = content == 'x';
    return `<span class="markdown task ${checked ? 'checked' : ''}"><div id="markdown" class="inner"></div></span>`
}

const task = new Plugin(/\[/,/(x| )/,/\]/,'task', taskElement);

function parse(string) {

    const NEWLINE = "\n";
    let raw = ('\n' + string + '\n');

    const collections = [
        
        header5,
        header4,
        header3,
        header2,
        header1,
        dotlist,
        new Plugin(/\*\*\*/, /.+?/, /\*\*\*/, 'bolditalic', (start, content, end) => `<span class="markdown bold italic">${content}</span>`),
        bold,
        italic,
        line,
        unItalic,
        numlist,
        table,
        anchor,
        image,
        codeBlock,
        quote,
        inlineCode,
        task,
        scratched,
        // breakline

    ];

    collections.forEach(plugin => {
        raw = plugin.identifyText(raw);
    });

    collections.forEach(plugin => {
        raw = plugin.replaceSymbols(raw);
    });

    raw = raw.replaceAll("\n","_");
    // raw = textify(raw)
    // raw = raw.replaceAll("\n","$")
    return "<div class=\"markdown background\">\n" + raw.replaceAll(NEWLINE, '\n') + "\n</div>"
}

export { parse };
