/**
 * Removes lookahead regular expressions.
 * @example removeLookahead(/(?<=ex)am(?=ple)/) // => /example/
 * removeLookahead(/(?<=ex)am(?=ple)/,true) // => /am/
 */
export declare function removeLookahead(regExp: RegExp, includeContent: boolean): RegExp;
export declare function textify(inputString: string): string;
export declare function simpleCode(code: string): string;
