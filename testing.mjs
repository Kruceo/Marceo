import fs from 'fs'
import { parse } from './markdown.mjs'

let raw = parse(`# LinuxKit

[![CircleCI](https://kruceo.com/cat_logo_preenchido.png)](https://circleci.com/gh/linuxkit/linuxkit)

`)

fs.writeFileSync('./test.html','<head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>Page Title</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><style>'+fs.readFileSync('./themes/openai.css','utf-8')+'</style>\n'+raw +'\n <a href="kruceo.com">rasdadasddasdas</a></body>','utf-8')