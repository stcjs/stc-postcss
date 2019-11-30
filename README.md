## stc-postcss

stcjs postcss plugin

## Install

```
npm install stc-postcss --save-dev
```

## How to Use

in stc.config.js file, add:

```js
const postcss = require('stc-postcss');

stc.transpile({
  postcss: {
    plugin: postcss,
    include: /\.css$/,
    options: {
      plugins: [
        require('autoprefixer'),
        require('postcss-nested')
      ]
    }
  }
});
```

## More options
See https://github.com/postcss/postcss get more options.