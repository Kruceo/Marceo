export default class Match {
    content: string;
    start: string;
    end: string;
    constructor(start: string, content: string, end: string);
    get complete(): string;
    /**
     * Gets a collection of matchs, normalized with start, content and end.
     */
    static getFromText(initRegExp: RegExp, contentRegExp: RegExp, endRegExp: RegExp, text: string): Match[];
}
