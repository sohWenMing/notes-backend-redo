module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'es2021': true
    },
    plugins: [
        '@stylistic'
    ],
    'extends': 'eslint:recommended',
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        '@stylistic/indent': ['error', 4],
        '@stylistic/no-trailing-spaces': 'error',
        '@stylistic/semi': ['error', 'always'],
        '@stylistic/object-curly-spacing': ['error', 'always'],
        '@stylistic/quotes': ['error','single', { 'allowTemplateLiterals': true }],
        'no-console': 'warn',
    }
};
