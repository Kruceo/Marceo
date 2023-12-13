class Regex {
    constructor(firstSymbol,content, lastSymbol, process) {
        this.firstSymbol = firstSymbol;
        this.content = content;
        this.lastSymbol = lastSymbol;
        this.process = process;
    }

    get exp() {
        return new RegExp(this.firstSymbol + this.content + this.lastSymbol, 'gs')
    }

    applyToString(string) {
        let newString = string + '';

        const match = newString.match(this.exp);
        if (match)
            match.forEach((each, index) => {
                let literalFirstSymbol = each.match(new RegExp(this.firstSymbol));
                let literalLastSymbol = each.match(new RegExp(this.lastSymbol));
                let content = each.slice(literalFirstSymbol[0].length, each.length - literalLastSymbol[0].length);
                const result = this.process(literalFirstSymbol, literalLastSymbol, content);
                newString = newString.replace(each, result);

                // console.log('index   |', index)
                // console.log('exp     |', this.exp)
                // console.log('first   |', literalFirstSymbol[0])
                // console.log('last    |', literalLastSymbol[0])
                // console.log('content |', content)
                // console.log('input   |', each)
                // console.log('result  |', result.replaceAll('\n', ''))
                // console.log('--------------------------------')
            });
        return newString
    }
}

class Plugin{
    /**
     * A collection of Regex to process a string;
     * @param {Regex[]} processList 
     */
    constructor(processList){
       this.processList = processList??[];
    }

    applyToString(string){
        let raw = ''+string;
        this.processList.forEach(regex=>{
            raw = regex.applyToString(raw);
        });
        return raw
    }
    
}

function numListElement(first,last,content){
    const space = parseInt(first[0].slice(first[0].indexOf(' '),first[0].lastIndexOf(' ')).length/3);
    return `
<div id="markdown" class="list-item level${space}">\
    <span class="markdown pad" style="white-space:pre-wrap">${"".padEnd(space*10, ' ')}</span>\
    <span class="markdown num left level${space}"></span>\
    <span class="markdown num level${space}">${first[0].replace('.','').replace('\n','')}</span>\
    <span class="markdown num right level${space}"></span>\
    ${content}\
</div>\
${last[0]}`
}

const numList = new Plugin([
    new Regex('(\n *?\\d\\.)'         , ".*?"                 , `(?=\n)`       , numListElement)
]);

function idfy(string) {
    let res = '';
    const match = string.match(
        /(\b|[^ \*_`"']).+(\b|[^ \*_`"'])/
    );
    if (match) {
        res = match[0].replace(/ ( )*/g,'-');
    }
    return res
}

function textify(string,change){
    const toChange = change??"#$:_|`-^*.()[]< >\"\'";
    let newString = string + '';
    toChange.split('').forEach(each=>{
        newString = newString.replaceAll(each,"&#x"+each.charCodeAt(0).toString(16)+";");
    });
    return newString
}

function header1Element(first, last, content) {
    const id = idfy(content);
    return `<h1 id="${id}" class="markdown header1" >${content}</h1>`
}
function header2Element(first, last, content) {
    console.log(content);
    const id = idfy(content);
    return `<h2 id="${id}" class="markdown header2" >${content}</h2>`
}
function header3Element(first, last, content) {
    const id = idfy(content);
    return `<h3 id="${id}" class="markdown header3" >${content}</h3>`
}
function header4Element(first, last, content) {
    const id = idfy(content);
    return `<h4 id="${id}" class="markdown header4" >${content}</h4>`
}
function header5Element(first, last, content) {
    const id = idfy(content);
    return `<h5 id="${id}" class="markdown header5" >${content}</h5>`
}
function header6Element(first, last, content) {
    const id = idfy(content);
    return `<h6 id="${id}" class="markdown header6" >${content}</h6>`
}

const headers = new Plugin([
    new Regex(`(?:\n)###### `, "[^\n]+?", `(?=\n)`, header6Element),
    new Regex(`(?:\n)##### `,  "[^\n]+?", `(?=\n)`, header5Element),
    new Regex(`(?:\n)#### `,   "[^\n]+?", `(?=\n)`, header4Element),
    new Regex(`(?:\n)### `,    "[^\n]+?", `(?=\n)`, header3Element),
    new Regex(`(?:\n)## `,     "[^\n]+?", `(?=\n)`, header2Element),
    new Regex(`(?:\n)# `,      "[^\n]+?", `(?=\n)`, header1Element),
]);

function lineElement(first, last, content) {
    return `<div class="markdown line"></div>`
}

const line = new Plugin([
    new Regex(`-`, "(-)*", `--`, lineElement),
]);

function dotListElement(first, last, content) {
    const space = parseInt(first[0].slice(first[0].indexOf(' '), first[0].lastIndexOf(' ')).length / 3);
    return `
<div class="markdown list-item level${space}"> \
<span style="white-space:pre-wrap">${"".padEnd(space * 10, ' ')}</span> \
<span class="markdown list-dot level${space}"></span>${content} \
</div> \
${last[0]}`

}

const dotList = new Plugin([
    new Regex("(\n\\s*?\\-)[^\\-]", "[^\\*]*?", `(?=\n)`, dotListElement),
    new Regex('\n\\* ', "[^\\*]*?", `(?=\n)`, dotListElement),
]);

function quoteElement(first, last, content) {
    return `<div class="markdown quote">${content}</div>`
}

const quote = new Plugin([
    new Regex('\n(>)', ".*?", "\n", quoteElement),
]);

function codeBlockElement(a,b,content){
   const language = a[0].replaceAll('\n','').replaceAll('`','');
    return `
<div class="markdown code-block">\
<div class="markdown language">${textify(language)}</div>\
<div class="markdown code" style="white-space:pre-wrap;">${textify(content)}</div>
</div>
`
}

const codeBlock = new Plugin([
    new Regex('(\\`\\`\\`).*?\n', ".*?", '(\\`\\`\\`)', codeBlockElement),
]);

function boldElement(first, last, content) {
    return `<span style="font-weight:bold" class="markdown bold">${content}</span>`
}

const bold = new Plugin([
    new Regex('\\*\\*(?! )', `.*?(?!\n)`, `\\*\\*`, boldElement),
    new Regex(`(?= |\\b)__`, ".+?", '__(?= |\\b)', boldElement),
]);

function italicElement(first, last, content) {
    return `<span style="font-style:italic" class="markdown italic">${content}</span>`
}

const italic = new Plugin([
    new Regex('\\*(?! )', `.*?(?!\n)`, `\\*`, italicElement),
    new Regex(`(?= |\\b)_`, ".+?", '_(?= |\\b)', italicElement),
]);

function inlineCodeElement(first, last, content) {
    return `<span class="markdown inline-code">${textify(content)}</span>`
}

const inlineCode = new Plugin([
    new Regex('\\`', ".*?", '\\`', inlineCodeElement)
]);

function imageElement(first,last,content){
    const alt = first[0].slice(2,first[0].length - 2);
    let cntt = content;
    let title = content.match(/(\"|\').*?(\"|\')/);
    if(title){
        title = title[0];
        cntt = cntt.replaceAll(title,'');}
    console.log(cntt);
    return `<img id="${idfy(alt)}" class="markdown image" src="${textify(cntt)}" title=${textify(title)} alt="${textify(alt)}"></img>`
}

const image = new Plugin([
    new Regex('\\!\\[.*?\\]\\('                    , ".*?"                 , "\\)"                  , imageElement)
]);

function anchorElement(first,last,content){

    let text = first[0].slice(1,first.length-3);
    return `<a class="markdown anchor" href="${textify(content)}">${text}</a>`
}

const anchor = new Plugin([
    new Regex('\\[.*?\\]\\('                       , ".*?"                 , "\\)"                  , anchorElement),
]);

function emojiElement (first,last,content){
  return "🔸"
}

function scratchedElement(first, last, content) {
    return `<span class="markdown scratched" style="text-decoration:line-through">${content}</span>`
}

const scratched = new Plugin([
    new Regex('~~', ".*?", '~~', scratchedElement),
]);

function taskElement(first, last, content) {
    const checked = first[0] == '[x]';
    return `<span class="markdown task ${checked ? 'checked' : ''}"><div id="markdown" class="inner"></div></span>`
}

const task = new Plugin([
    new Regex('(\\[ \\]|\\[x\\])', "", '', taskElement),
]);

function tableElement(first, last, content) {


    let NEWLINE = first[0].replaceAll('|', '');
    let padContent = content.replace(new RegExp(`(?!\\|)${NEWLINE}(?!\\|)`, 'g'), `|${NEWLINE}|`);
    console.log("NEWLINE:", NEWLINE);
    const split = padContent.split('|');
    console.log(padContent);
    let rowIndex = 0;
    let rows = [];
    let isHeader = true;
    split.forEach(element => {
        if (element == '') return;
        if (element == NEWLINE) {
            rowIndex++;
            return null;
        }

        if (/^(\s)*?\-(\-)+\-(\s)*?$/.test(element)) {
            console.log('|' + element + '|', true);
            isHeader = false;
            return null
        }

        if (!rows[rowIndex]) rows[rowIndex] = [];
        rows[rowIndex].push(
            {
                content: element,
                isHeader,
            });
    });


    const biggerRowLength = [...rows].sort((a, b) => b.length - a.length)[0].length;
    let result = '';
    let error = false;
    rows.forEach((row, rowIndex) => {
        let rowCelWidth = biggerRowLength / row.length;
        if (("" + rowCelWidth).includes('.')) error = true;
        row.forEach((col, colIndex) => {
            let isLeft = (colIndex == 0);
            let isRight = (colIndex == rows[rowIndex].length - 1);
            let isBottom = (rowIndex == rows.length - 1);
            let isTop = (rowIndex == 0);

            result += `
            <div class="markdonw cel ${isLeft ? "left" : ''} ${isRight ? "right" : ''} ${isBottom ? 'bottom' : ''} ${isTop ? 'top' : ''} ${col.isHeader ? 'header' : ''}" \
            style="grid-column:span ${rowCelWidth}"\>${col.content}</div>
            `;
        });
    });
    if (error) return first[0] + content + last[0]
    return `
<div class="markdown table" style="display:grid; grid-template-columns:repeat(${biggerRowLength},1fr)"> \
${result} \
</div>
`
}

const table = new Plugin([
    new Regex("\n(?!\\|)", "[^#\n]+?\\|[^\n]+", "(?=\n)", (f, l, c) => { return "\n|" + c + "|" }),  //prepare to accept non-piped tables
    new Regex(`(?:\n)\\|`, `.*?`, `\\|\n(?!\\|)`, tableElement),
]);

function tabBlockElement(a,b,content){
    let c = content.split('\n')
        .reduce((acum,next)=>{
            let n = next + '\n';
            if(/^( {4})/.test(n)){
                n = n.slice(4,n.length);
            }
            return acum + n

        },'');
    return `
    <div class="markdown tab-block"><div class="code" style="white-space:pre-wrap;">${textify(c)}\</div></div>
    `
}

const tabBlock = new Plugin([
    new Regex('(\n {4})', "[^\\`]+?", '\n(?!\\s{4})(\n)*?', tabBlockElement)
]);

function htmlTagElement(first, last, content) {
    const attributes = (" " + content + " ").match(/(?= )*?.+?=.+?(?= )+/g);
    let newContent = content + '';
    console.log(first[0],content,last[0]);
    if(attributes && attributes!= '')
    attributes.forEach(element => {
        let value = element.split('=')[1];
        value = value.slice(1, value.length - 1);
        newContent = newContent.replace(value, textify(value));
    });
    return first[0] + newContent + last[0]
}

const htmlTag = new Plugin([new Regex('<[^> ]+', ".*?", ">", htmlTagElement)]);

function breaklineElement(first, last, content) {
    return "<p></p>"
}

const breakline = new Plugin([
    new Regex("\n", "(\n)+?", "(?!\n)", breaklineElement)
]);

function parse(string) {

    const NEWLINE = "\n";
    let raw = ('\n' + string + '\n');
    
    const plugins = [
        codeBlock,
        tabBlock,
        inlineCode,
        htmlTag,
        task,
        table,
        image,
        anchor,
        headers,
        quote,
        bold,
        italic,
        numList,
        dotList,
        scratched,
        line,
        new Regex('\\:'                                , "[\\w]+"              , "\\:"                  , emojiElement),
        breakline
    ];

    plugins.forEach((each, index) => {
        raw = each.applyToString(raw);
    });

    return "<div class=\"markdown background\">\n" + raw.replaceAll(NEWLINE,'\n') + "\n</div>"
}

export { parse };
