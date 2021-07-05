# @agds/eslint-config-js



**版本** ：1.0.6

agds的js eslint配置

## 快速开始

### 安装

```bash
npm i -D @agds/eslint-config-js
```

### 引入

```js
// .eslintrc.js
module.exports = {
    extends: [
        '@agds/js',
    ],
};
```




### 添加lint脚本

在`package.json`的`scripts`下添加lint命令；

```json
{
  "scripts": {
    "lint": "eslint --ext .js,.json,.md src",
    "lint:fix": "eslint --ext .js,.json,.md src --fix"
  }
}
```

### 基于`lint-staged`提供增量lint脚本

- 安装`lint-staged`包
    ```
    npm i -D lint-staged
    ```
- 在`package.json`中添加`pkg['lint-staged']`脚本
    ```json
    {
      "lint-staged": {
        "src/**/*.{js,json,md}": [
          "eslint --fix"
        ]
      }
    }
    ```

### 使用`yorkie`在git声明周期内检测代码格式

- 安装`yorkie`包
    ```
    npm i -D yorkie
    ```
- 在`package.json`中添加`pkg.gitHooks`脚本
    ```json
    {
      "gitHooks": {
        "pre-commit": "lint-staged"
      }
    }
    ```
 <!-- 渲染后缀内容  -->



<a name="source"></a>


## 配置源码

```js
const { FastPath, FastFs } = require('@agds/node-utils');
const cwdBabelConfigPath = FastPath.getCwdPath('./babel.config.js');
const hasCwdBabelConfg = FastFs.getPathStatSync(cwdBabelConfigPath);
module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: [
        'standard',
        'plugin:jsdoc/recommended',
        'plugin:markdown/recommended',
    ],
    plugins: [
        'jsdoc',
        'json-format',
    ],
    settings: {
        'json/sort-package-json': false,
        'json/json-with-comments-files': [],
        'json/ignore-files': [],
        jsdoc: {
            mode: 'typescript',
        },
    },
    parser: hasCwdBabelConfg ? '@babel/eslint-parser' : undefined,
    parserOptions: {
        ecmaVersion: 12,
        babelOptions: {
            configFile: hasCwdBabelConfg ? cwdBabelConfigPath : undefined,
        },
    },
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'space-before-function-paren': [
            'error',
            { anonymous: 'always', named: 'never', asyncArrow: 'always' },
        ],
        // jsdoc
        'valid-jsdoc': 'off',
        'jsdoc/require-property': 0,
        'jsdoc/require-returns-description': 0,
        'jsdoc/no-undefined-types': 0,
    },
    overrides: [
        {
            files: ['**/*.md/*.{js,json}', 'docs/**', 'test/**'],
            rules: {
                'no-console': 'off',
                'import/no-unresolved': 'off',
                'no-undef': 'off',
                'no-unused-expressions': 'off',
                'no-unused-vars': 'off',
                'padded-blocks': 'off',
                'eol-last': 'off',
            },
        },
    ],
};
```



