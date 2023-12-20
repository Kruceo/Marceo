import Match from "./Match";
interface HtmlHandler {
    (start: string, content: string, end: string): string;
}
interface identifiedMatch extends Match {
    id: string;
    hiddenContent?: boolean;
}
interface pluginOptions {
    hideContent: boolean;
}
export default class Plugin {
    /**
     * Add's a new normalized function for the software;
     */
    matches: identifiedMatch[];
    start: RegExp;
    content: RegExp;
    end: RegExp;
    name: string;
    htmlHandle: HtmlHandler;
    symbol: string;
    options: pluginOptions;
    constructor(start: RegExp, content: RegExp, end: RegExp, name: string, htmlHandler: HtmlHandler, options?: pluginOptions);
    /**
     * Match the text and sinalize all to after replace then.
     */
    identifyText(text: string): string;
    /**
     * Replace pre-sinalized text with the plugin handler.
     */
    replaceSymbols(text: string): string;
}
export {};
