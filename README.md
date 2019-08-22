<div align="center">

[![NPM version](https://img.shields.io/npm/v/record-entry-plugin)](https://www.npmjs.com/package/record-entry-plugin)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT)

# record-entry-plugin

</div>
After the build, plugin record the entry point of the project。This way, you can leave the webpack runtime code and request the chunks in the correct order.

## install

```bash
npm install record-entry-plugin --save-dev
```

## use

```javascript
// At the end, the file name of the entry file record is `${publicPath}+${fileName}.json`, PublicPath reads webpack configuration publicPath
new recordEntryPlugin({
  fileName: 'chunks'
});
```

## The contents of chunks.json

when the config of webpack is :

```javascript
  entry: path.resolve(__dirname, `../src/index.js`),
```

content of chunk.json :

```javascript
  {"main":["/main.6097c34ccf96ffa3b783.js"]}
```

---

when the config of webpack is :

```javascript
  entry: {
    design: path.resolve(__dirname, `../src/design/index.js`),
    runtime: path.resolve(__dirname, `../src/runtime/index.js`)
  }
```

content of chunk.json :

```javascript
{
  "design": ["/design.b7b434d9ea6818c7e822.js"],
  "runtime": [
    "/css/runtime.0826353e91956fa5d041.css",
    "/runtime.662c683e4ed914a7e798.js"
  ]
}

```

## License

The `record-entry-plugin` is [MIT licensed](./LICENSE).
