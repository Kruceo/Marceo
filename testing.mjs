import fs from 'fs'
import { parse } from './markdown.mjs'

let raw = parse(`
# **ChatRGB** 

## **Intro**

ChatRGB is a Discord bot designed to be funny, but it now supports roleplays and maintains context. With a command system and chat history, ChatRGB provides an engaging and humorous experience for users.

<br>
<br>

## **Install**

\`\`\`bash
git clone https://github.com/Kruceo/ChatRGB.git bot
cd bot
npm i
node index.mjs\`\`\`

This will generate a "data/memory" folders, this paths will contain the configuration of the bot.

\`\`\`js
/* ./data/memory/config.conf */
discord_key=xxx-xxx-xxx    //your discord key
model=text-davinci-003     //Open AI model
maxtokens=128              //max tokens to be burned at request  
temperature=0.5            //like creativity
enable_context=true        //enable context history, maybe cost more tokens per message
context_length=5           //the number of old messages that the bot will remember
context_timeout=120000     //the time in millis to the bot forget history \`\`\`

You don't need restart the process to update the config, just change the file.

<br>
<br>

## **Extra**
if you want to change the config files path, just run the script like this:

\`\`\`bash
node index.mjs -cp /new/path/to/config\`\`\`

this will generate the config files at this new folder.

<br>
<br>

## Author
take a look at <a href="https://kruceo.com">kruceo.com</a>`)

fs.writeFileSync('./test.html','<head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>Page Title</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><style>'+fs.readFileSync('testing.css','utf-8')+'</style>\n'+raw +'\n</body>','utf-8')