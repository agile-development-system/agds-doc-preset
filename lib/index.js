// const GenDoc = require('@agds/cli-plugin-doc');
const { FastPath, FastFs } = require('@agds/node-utils');
const pkgPath = FastPath.getCwdPath('package.json');
let pkg = {};
let repository;
if (FastFs.getPathStatSync(pkgPath)) {
    pkg = require(pkgPath);
    repository = (pkg.repository || { url: '' }).url.replace(/.git$/, '');
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
                config.postfixes = config.postfixes || [];
                config.postfixes.push(
                    {
                        id: 'license',
                        title: '许可证',
                        content: `${repository ? 'MIT License' : `[MIT License](${repository + '/blob/master/LICENSE'})`}\nCopyright (c) 2021 锦阳`,
                    },
                    {
                        id: 'donate',
                        title: '请维护者喝杯咖啡',
                        content: '',
                    },
                );
            },
        };
    })();
