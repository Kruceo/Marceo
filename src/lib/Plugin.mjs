import Regex from "./Regex.mjs";

export default class Plugin{
    /**
     * A collection of Regex to process a string;
     * @param {Regex[]} processList 
     */
    constructor(processList){
       this.processList = processList??[]
    }

    applyToString(string){
        let raw = ''+string
        this.processList.forEach(regex=>{
            raw = regex.applyToString(raw)
        })
        return raw
    }
    
}