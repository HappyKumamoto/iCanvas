'use strict';
const pug = require('pug');
const util = require('./handler-util');
const contents = [];//投稿一覧の表示

function handle(req, res) {
  switch (req.method) {
    case 'GET':
      //res.end('Think Different');
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      //res.end(pug.renderFile('./views/posts.pug'));
      res.end(pug.renderFile('./views/posts.pug', { contents: contents }));
      //配列を contents というプロパティ名でテンプレートに渡す
      break;
    case 'POST':
      // TODO POSTの処理/リクエストでdetaとendというデータを受け取った
      //イベントが生じたときの処理
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        //Streamに来るデータが文字列とは限らないので
        //.toString()を用いて文字列に
        const decoded = decodeURIComponent(body);
        //データを受け取りURIエンコードをデコード
        const content = decoded.split('content=')[1];
        //内容がkey=valueの形式で渡されるためフォームで設定したcontentという
        //キー名の値の部分を取得
        console.info('投稿されました: ' + content);//ログの出力
        contents.push(content);
        console.info('投稿された全内容: ' + contents);
        //投稿内容を配列に追加
        handleRedirectPosts(req, res);
        //ログの出力・handleRedirectPostsという関数を呼び出す
        ///Postsへのリダイレクトをハンドリングする関数
      });
      break;
    default:
      util.handleBadRequest(req, res);
      break;
  }
}
function handleRedirectPosts(req, res) {
  res.writeHead(303, {
    'Location': '/posts'
  });
  res.end();
  ///postsへのリダイレクトの実装
  //303-See Other・POSTでアクセスした際、その処理の後、
  //GETでも同じパスにアクセスし直してほしいとき
}

module.exports = {
  handle
};
