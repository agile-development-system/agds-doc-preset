# @agds/agds-doc-preset

**版本** ：1.0.1

agds的统一的doc配置

## 快速开始

### 安装

```bash
npm i -D @agds/agds-doc-preset
```

### 引入

```js
// .agds.doc.config.js
const preset = require('@agds/agds-doc-preset');
module.exports = {
    presets: [preset],
};
```


 <!-- 渲染后缀内容  -->



<a name="source"></a>


## 配置源码

```js
const GenDoc = require('@agds/cli-plugin-doc');
const { FastPath, FastFs } = require('@agds/node-utils');
const pkgPath = FastPath.getCwdPath('package.json');
const path = require('path');
let pkg = {};
let repository;
if (FastFs.getPathStatSync(pkgPath)) {
    pkg = require(pkgPath);
    try {
        repository = pkg.repository.url.replace(/.git$/, '');
    } catch (error) {
    }
}

module.exports = (
    /**
     * 配置参数
     *
     * @returns {GenDoc.RenderOptions}
     */
    async () => {
        return {
            output: 'README.md',
            helpers: {
                devInstall: true,
                postfixes: [
                ],
            },
            /**
             * 最后处理的函数
             *
             * @param {GenDoc.RenderOptions} config 文档配置
             */
            modify(config) {
                config.helpers.postfixes.push(
                    {
                        id: 'license',
                        title: '许可证',
                        content: `${repository ? `[MIT License](${repository + '/blob/master/LICENSE'})` : 'MIT License'}\nCopyright (c) 2021 锦阳`,
                    },
                    {
                        id: 'donate',
                        title: '请维护者喝杯咖啡',
                        content: getRelativeCode('./docs/donate.md'),
                    },
                    {
                        id: 'dingtalk',
                        title: '加入钉钉群讨论或加入开发',
                        content: getRelativeCode('./docs/dingtalk.md'),
                    },
                );
                config.helpers.logo = 'https://gitee.com/agile-development-system/agds-doc-preset/raw/master/docs/logo/light/1.png';
            },
        };
    }
)();

/**
 * 获取绝对路径的文件内容
 *
 * @param {string} filename 文件名
 */
function getRelativeCode(filename) {
    GenDoc.getFileContent(path.join(__dirname, filename));
}
```




<a name="license"></a>


## 许可证

[MIT License](https://gitee.com/agile-development-system/agds-doc-preset/blob/master/LICENSE)
Copyright (c) 2021 锦阳



<a name="donate"></a>


## 请维护者喝杯咖啡



<a name="dingtalk"></a>


## 加入钉钉群讨论或加入开发


