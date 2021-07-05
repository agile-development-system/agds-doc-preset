const GenDoc = require('@agds/cli-plugin-doc');
const { FastPath, FastFs } = require('@agds/node-utils');
const pkgPath = FastPath.getCwdPath('package.json');
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
                console.log(repository);
                config.helpers.postfixes.push(
                    {
                        id: 'license',
                        title: '许可证',
                        content: `${repository ? `[MIT License](${repository + '/blob/master/LICENSE'})` : 'MIT License'}\nCopyright (c) 2021 锦阳`,
                    },
                    {
                        id: 'donate',
                        title: '请维护者喝杯咖啡',
                        content: GenDoc.getFileContent('./docs/donate.md'),
                    },
                    {
                        id: 'dingtalk',
                        title: '加入钉钉群讨论或加入开发',
                        content: GenDoc.getFileContent('./docs/dingtalk.md'),
                    },
                );
                config.helpers.logo = 'https://gitee.com/agile-development-system/agds-doc-preset/raw/master/docs/logo/light/1.png';
            },
        };
    })();
