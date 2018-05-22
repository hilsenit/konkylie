module.exports = {
  test: /\.html$/,
  use: [ {
    loader: 'html-loader?exportAsEs6Default',
  }]
}
