module.exports = {
  test: /\.html$/,
  use: [ {
    loader: 'html-loader?exportAsEs6Default',
    options: {
      minimize: true
    }
  }]
}
