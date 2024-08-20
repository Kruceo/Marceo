import cp from 'child_process'
import fs from 'fs'

let isBunjs = false

try {
    cp.execSync("bun -v")
    isBunjs =true
} catch (error) {
    console.log("bun is not installed, using nodejs")
}

fs.writeFileSync("./tests/test.mjs",'import {parse} from "../dist/index.mjs";import fs from "fs" ; console.log(parse(fs.readFileSync("./tests/test.md","utf8")));')

const runtime = isBunjs?"bun":"node --experimental-modules"
const packageMan = isBunjs?"bun":"npm"

cp.execSync(`${packageMan} run build`)

let result = cp.execSync(`${runtime} ./tests/test.mjs`)

const compare = fs.readFileSync("./tests/compare.txt","utf-8")
fs.rmSync('./tests/test.mjs')
fs.writeFileSync("./tests/lastResult.html",result)

let verifiedResult = result.toString().split("\n").reduce((acum,next,index)=>{
    if(compare.split("\n")[index]!=next)return acum +"<div style='background-color:red;color:white;'>" + next +"</div>\n"
    else return acum +"\n" + next
},"")



if(result.toString() != compare ){
    try {
        let theme = fs.readFileSync("./themes/openai.css","utf-8")
        let html = fs.readFileSync("./tests/lastResult.html","utf-8")

        // fs.writeFileSync("./tests/index.html",`<style>${theme}</style><div style="display:flex;"><d><h1 style="color:#f008;">BAD</h1>${verifiedResult}</d><d><h1 style="color:green;">OK</h1>${compare}</d></div>`)
        fs.writeFileSync('./tests/index.html',`<style>${theme}</style><main>\n${html}\n</main>`)
        // cp.execSync('xdg-open ./tests/lastResult.html')
        cp.execSync('xdg-open ./tests/index.html')
    } catch (error) {
        console.log(error)
    }
    throw new Error("The comparation don't match.")
}

console.log("[PASS]")
