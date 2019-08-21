/**
 * 将首次需要加载的js和css提前写入json文件里面
 * @filename {string}  {description}
 */
class EntryRecord {
  constructor({ fileName }) {
    this.fileName = fileName;
  }
  apply(compiler) {
    compiler.hooks.emit.tap('recordEntryPlugin', compilation => {
      const {
        output: { publicPath }
      } = compiler.options;
      let obj = {};
      for (const keyValuePair of compilation.entrypoints) {
        const [name, cg] = keyValuePair;
        obj[name] = {
          assets: cg.chunks.reduce(
            (array, c) => array.concat(c.files || []),
            []
          )
        };
      }
      // const {
      //   main: { assets = [] }
      // } = obj;
      const { fileName } = this;
      const result = {};
      Object.keys(obj).forEach(key => {
        const { assets } = obj[key];
        if (assets.length) {
          result[key] = assets.map(asset => `${publicPath}${asset}`);
        }
      });
      if (Object.keys(obj).length) {
        const source = JSON.stringify(result);
        compilation.assets[`${fileName}.json`] = {
          source: function() {
            return source;
          },
          size() {
            return source.length;
          }
        };
      }
    });
  }
}
module.exports = EntryRecord;
