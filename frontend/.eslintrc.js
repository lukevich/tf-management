module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: ['airbnb'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier', 'react-hooks'],
    settings: {
        react: {
            pragma: 'React',
            version: '16.13.1',
        },
        'import/resolver': {
            node: {
                moduleDirectory: ['node_modules', 'src'],
            },
        },
    },
    rules: {
        indent: [2, 4, { SwitchCase: 1 }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-filename-extension': 'off',
        'max-len': ['error', 120, 4, {
            ignoreComments: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-indent': [2, 4, { checkAttributes: true, indentLogicalExpressions: true }],
        'no-use-before-define': ['error', { functions: false }],
        'import/prefer-default-export': 'off',
        'no-underscore-dangle': 'off',
        'prefer-destructuring': ['error', { array: false, object: true }],
        'import/no-cycle': 'off',
        'consistent-return': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react/jsx-props-no-spreading': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'object-curly-newline': 'off',
        'no-plusplus': 'off',
    },
};
