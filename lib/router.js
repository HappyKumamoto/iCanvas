'use strict';
const postsHandler = require('./posts-handler');
///postsのパスにアクセスがあったときはposts-handlerモジュールの
//handle関数に行ってもらう
//requireを書いたモジュール自身を基準として相対パスを指定
const util = require('./handler-util');


function route(req, res) {
  switch (req.url) {
    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/logout':
      // TODO ログアウト処理
      util.handleLogout(req, res);
      break;
    default:
      util.handleNotFound(req, res);
      //handleNotFound関数
      break;
  }
}

module.exports = {
  route
};