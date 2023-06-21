import fs from 'fs'
import { parse } from './markdown.mjs'

let raw = parse(`
Claro! Aqui está um exemplo de texto em Markdown que utiliza várias sintaxes disponíveis:

# Título Principal

## Título Secundário

### Título Terciário

**Negrito** e _itálico_

Lista numerada:
1. Item 1
2. Item 2
3. Item 3

Lista com marcadores:
- Marcador 1
- Marcador 2
- Marcador 3

Citação:
> "Uma citação famosa."

Código inline: \`printf("Olá, mundo!");\`

Bloco de código:

\`\`\`python
def soma(a, b):
    return a + b
\`\`\`

Tabelas:

| Coluna 1 | Coluna 2 | Coluna 3 |
| -------- | -------- | -------- |
| Valor 1  | Valor 2  | Valor 3  |
| Valor 4  | Valor 5  | Valor 6  |

Links: [Texto do link](https://www.example.com)

Imagem:
![Descrição da imagem](https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png)

Linha horizontal:

---

Isso é apenas um exemplo básico de algumas sintaxes disponíveis no Markdown. Você pode explorar mais recursos e sintaxes em guias e documentações específicas do Markdown.
`)

fs.writeFileSync('./test.html','<head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>Page Title</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><style>*{font-family:sans-serif}</style>\n'+raw +'\n</body>','utf-8')