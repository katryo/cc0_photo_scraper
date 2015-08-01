var casper = require("casper").create();
var fs = require('fs');

//フェイスブックにログインする

casper.start("http://www.pexels.com/search/technology/", function(){

});

//近況を投稿

casper.then(function(){
    casper.wait(5000, function() {
        this.evaluate(function() {
            var images = document.getElementsByTagName('img');
            util.print(images[0].value);

var text = images[0].value;
fs.writeFile('hoge.txt', text, 'w');
        });
    });
});

casper.run();
