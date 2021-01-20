'use strict';
const postsHandler = require('./posts-handler');
///postsのパスにアクセスがあったときはposts-handlerモジュールの
//handle関数に行ってもらう
//requireを書いたモジュール自身を基準として相対パスを指定

function route(req, res) {
  switch (req.url) {
    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/logout':
      // TODO ログアウト処理
      break;
    default:
      break;
  }
}

module.exports = {
  route
};