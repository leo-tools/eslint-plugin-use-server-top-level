# eslint-plugin-use-server-top-level

Custom ESLint rule to ensure specified TypeScript files start with `'use server'`.

## Features
- Checks if the first code line of matched files is `'use server'` or `"use server"`.
- Skips leading comments and empty lines.
- Path matching is configurable via the `pathPattern` option.

## Installation

Copy `eslint-plugin-use-server-top-level.js` to your project root.

## Usage

1. Import the plugin in your ESLint config (e.g. `eslint.config.mjs`):

```js
import useServerPlugin from './eslint-plugin-use-server-top-level.js';

export default [
  {
    plugins: {
      'use-server': useServerPlugin,
    },
    rules: {
      // Configure the rule and specify the path pattern
      'use-server/require-use-server': ['error', { pathPattern: 'src/services/actions/.*\\.ts$' }],
    },
  },
];
```

2. Run ESLint on your target files:

```bash
eslint src/services/actions/**/*.ts
```

## Options
- `pathPattern` (string): Regex pattern to match file paths. Only matched files will be checked.

## Example
If a file at `src/services/actions/foo.ts` does not start with `'use server'`, ESLint will report an error:

```
Error: servers/actions/*.ts files must start with 'use server'
```

## License
MIT

