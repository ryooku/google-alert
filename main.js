function getFeedURL() {
  return 'https://www.google.com/alerts/feeds/05376717576481271219/10876191608748414710';
}

function getChatWorkToken() {
  return 'e3b36529a7391fc252a209a3603ca111';
}

function testBot(message) {
  var client = ChatWorkClient.factory({token:"e3b36529a7391fc252a209a3603ca111"});
  client.sendMessage({
    room_id: 127063991,
    body: "[info]" + message + "[/info]"
  });
}

function getGoogleAlert() {
  var feedURL = getFeedURL();
  var atom = XmlService.getNamespace('http://www.w3.org/2005/Atom');
  var document = XmlService.parse(UrlFetchApp.fetch(feedURL).getContentText());
  var items = document.getRootElement().getChildren('entry', atom);


  for(var i = 0; i < items.length; i++) {
    //サイトのURLを取得
    var link = items[i].getChild('link', atom).getAttribute('href').getValue();
    //サイトのタイトルを取得
    var title = items[i].getChild('title', atom).getText();
    //URLとタイトルを連結
    if (i == 0){
      var message = "(*)今日のニュースをお届けします！\n" + title + "\n" + link;
    }else{
      var message = title + "\n" + link;
    }
    //HTMLタグを除去してチャットワークへ投稿
    Logger.log(message);
    testBot(message);


    // client.sendMessage({room_id: room_id, body: message.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')});
  }


}