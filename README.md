# Marcel: Markdown to HTML Parser with Plugin Support

Marcel is a versatile TypeScript and JavaScript library designed for parsing Markdown to HTML. It boasts plugin support and can seamlessly run in both Node.js and browser environments.

## Installation

To get started with Marcel, simply install it using npm:

```bash
npm install marcel
```

## Usage

Import the `parse` function from 'marcel' in your TypeScript or JavaScript code, and you're ready to convert your Markdown content into HTML.

```javascript
import { parse } from 'marcel';

const markdownContent = '# My **Markdown**';
const htmlResult = parse(markdownContent);

console.log(htmlResult);
```

This example demonstrates how to convert the Markdown string `'# My **Markdown**'` to its corresponding HTML representation using Marcel's `parse` function. The resulting HTML will be logged to the console.

## Compatibility

Marcel is designed to seamlessly work in both Node.js and browser environments, providing flexibility for your projects. Whether you are building server-side applications or client-side web applications, Marcel has you covered.

## Contributing

We welcome contributions from the community. If you find issues or have ideas for improvement, please open an [issue](https://github.com/kruceo/marceo/issues) or submit a [pull request](https://github.com/kruceo/marceo/pulls) on GitHub.

## Author

- [Website](https://kruceo.com)
- [Donations](https://kruceo.com/donate)


