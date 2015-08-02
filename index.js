var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});

var fs = require('fs');
casper.start("http://www.pexels.com/search/horror/");

var maxNumOfImages = 0;

var didFetchedAllImages = false;
while (didFetchedAllImages === false) {
  casper.then(function() {
    this.wait(1000);
    images = this.evaluate(function(y) {
      window.scrollBy(0, y);
      var images = document.querySelectorAll('img');
      return images;
    }, 4000);
    if (maxNumOfImages >= images.length) {
      var srcs = images.map(function(image) {
        return image.src;
      });
      didFetchedAllImages = true;
    };
    casper.log(didFetchedAllImages, 'debug');
    maxNumOfImages = images.length;
    casper.log(maxNumOfImages, 'debug');
  });
  if(didFetchedAllImages === true) {
    break;
  }
  console.log('looping...');
};

casper.run();
