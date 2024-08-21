import Plugin from "./Plugin";

class Parser {
    plugins: Plugin[];
    constructor(plugins: Plugin[]) {
        const ordenedPlugins: Plugin[] = plugins.sort((a, b) => (a.options.hideContent ? 0 : 1) - (b.options.hideContent ? 0 : 1))
        this.plugins = ordenedPlugins
    }

    parse(mardown: string) {
        let raw = ('\n' + mardown + '\n')

        this.plugins.forEach(plugin => {
            raw = plugin.identifyText(raw)
        })

        this.plugins.forEach(plugin => {
            raw = plugin.replaceSymbols(raw)
        })

        return raw
    }
}

export default Parser