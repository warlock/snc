var path = require('path');

module.exports = {
  entry: './snc.js',
  output: {
    path: path.resolve("./"),
    library: "snc",
    filename: './build/snc.js',
    libraryTarget: "umd"
  }
};
