function testBot() {
  var client = ChatWorkClient.factory({token:"e3b36529a7391fc252a209a3603ca111"});
  client.sendMessage({
    room_id: 127063991,
    body: "[info][title]タイトルです[/title]ここにメッセージを書けます[/info]"
  });
}

