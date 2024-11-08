const path = require('path')

const config = {
  entry: './index.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'script.js',
  },
  mode: 'none',
}

module.exports = config
