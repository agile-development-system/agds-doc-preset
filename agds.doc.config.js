/*
 * @Author: 锦阳
 * @Create: 2021年05月31日
 */
const GenDoc = require('@agds/cli-plugin-doc');
const preset = require('./lib/index');
module.exports = (
    /**
     * 配置参数
     *
     * @returns {GenDoc.RenderOptions}
     */
    async () => {
        const [source] = (await Promise.all([
            GenDoc.getFilesCode({ dir: './lib', files: ['*'] }),
        ]));
        return {
            output: 'README.md',
            presets: [preset],
            helpers: {
                devInstall: true,
                importCode: GenDoc.getFileContent('./docs/import.js'),
                postfixes: [
                    {
                        id: 'source',
                        title: '配置源码',
                        content: GenDoc.renderCode(source),
                    },
                ],
            },
        };
    })();
