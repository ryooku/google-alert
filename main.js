function sendChatworkMessage(message) {
  var properties = PropertiesService.getScriptProperties();
  var client = ChatWorkClient.factory({token: properties.getProperty('CW_TOKEN')});
  client.sendMessage({
    room_id: properties.getProperty('CW_ROOM_ID'),
    body: "[info]" + message + "[/info]"
  });
}

function sendSEONews() {
  var properties = PropertiesService.getScriptProperties();
  var atom = XmlService.getNamespace('http://www.w3.org/2005/Atom');
  var document = XmlService.parse(UrlFetchApp.fetch(properties.getProperty('FEED_URI')).getContentText());
  var items = document.getRootElement().getChildren('entry', atom);

  if (items.length < 1) return;

  var message = "(*)本日のSEOニュース(*)\n\n";
  for(var i = 0; i < items.length; i++) {
    var link = items[i].getChild('link', atom).getAttribute('href').getValue();
    var title = items[i].getChild('title', atom).getText();
    var content = items[i].getChild('content', atom).getText();
    message +=  "------------------------------\n" + title + "\n" + content + "\n" + link + "\n";
  }

  sendChatworkMessage(message);
}