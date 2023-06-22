import fs from 'fs'
import { parse } from './markdown.mjs'

let raw = parse(`- item1
- item2
- item3
- item4
- item5
    - item1
    - item2
        - item3`)

fs.writeFileSync('./test.html','<head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>Page Title</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><style>'+fs.readFileSync('./themes/openai.css','utf-8')+'</style>\n'+raw +'\n <a href="kruceo.com">rasdadasddasdas</a></body>','utf-8')