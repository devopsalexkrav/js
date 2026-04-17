const playwright = require('eslint-plugin-playwright');

module.exports = [
  {
    ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**', 'package-lock.json']
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly'
      }
    },
    plugins: {
      playwright
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-skipped-test': 'warn',
      'playwright/expect-expect': 'off'
    }
  },
  {
    files: ['tests/**/*.js', 'fixtures/**/*.js'],
    languageOptions: {
      globals: {
        test: 'readonly',
        expect: 'readonly'
      }
    }
  }
];
