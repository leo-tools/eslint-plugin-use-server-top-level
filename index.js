'use strict'

module.exports = {
  rules: {
    'require-use-server': {
      meta: {
        type: 'problem',
        docs: {
          description: "Require 'use server' at the top of the file",
        },
        schema: [
          {
            type: 'object',
            properties: {
              pathPattern: { type: 'string' }
            },
            additionalProperties: false
          }
        ],
      },
      create(context) {
        const options = context.options[0] || {};
        const pathPattern = options.pathPattern || 'src/.*\\.ts$';
        const filename = context.getFilename();
        // 使用 pathPattern 作为路径匹配
        if (!new RegExp(pathPattern).test(filename)) {
          return {};
        }
        return {
          Program(node) {
            const sourceCode = context.getSourceCode();
            const lines = sourceCode.getText().split(/\r?\n/);
            // Skip leading empty lines and comments
            let firstCodeLine = '';
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;
              firstCodeLine = trimmed;
              break;
            }
            if (firstCodeLine !== "'use server'" && firstCodeLine !== '"use server"') {
              context.report({
                node,
                message: filename + " must start with 'use server'",
              });
            }
          }
        };
      }
    }
  }
};
