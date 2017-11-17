const express = require('express')
const app = express()
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const http = require('http');
const utils = require('utility');



const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static('./'))
app.get('/word/:word', function (req, res) {
  // queryWord(req.params.word, res)
  res.send('[0,1,1024]');
})
let port = 5001;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})

function queryWord(q, respond) {
  let salt = Math.round(Math.random() * 1000000);
  let sign = utils.md5(`4fd806981e4bf56d${q}${salt}vrw7x1D1Cou9stVQc0yShgNZutNeQCTh`);
  let url = `http://openapi.youdao.com/api?q=${q}&from=EN&to=zh_CHS&appKey=4fd806981e4bf56d&salt=${salt}&sign=${sign}`;
  http.get(url, res => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      console.log('-----', rawData)
      // respond.setHeader('Content-Type', 'text/plain');
      respond.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000')
      respond.send(rawData);
    });
  })
}