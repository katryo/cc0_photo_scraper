var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});

var fs = require('fs');
casper.start("http://www.pexels.com/search/fire/");

var maxNumOfImages = 0;
var srcs = [];

for (i = 0; i < 10; i++) {
  var images = [];
  casper.then(function() {
    this.wait(1000);
    var that = this;
    srcs = this.evaluate(function() {
      window.scrollBy(0, 1000);
      var images = document.getElementsByTagName('img');
      var src_list = [];
      for (var i = 0; i < images.length; i++) {
        src_list.push(images[i].src);
      }
      return src_list;
    });
    //casper.log(images, 'debug');
    // if (images !== null) {
    //   for (var i = 0; i < images.length; i++) {
    //     casper.log(images[i], 'debug');
    //   }
    // }
  });
  // casper.then(function() {
  //   if (maxNumOfImages >= images.length) {
  //     var image_array = Array.prototype.slice.call(images);
  //     var srcs = [];
  //     image_array.forEach(function(image) {
  //       if (image === null) {
  //         return;
  //       }
  //       srcs.push(image.src);
  //     });
  //     didFetchedAllImages = true;
  //     var f = fs.open('result.txt', 'w');
  //     f.write(srcs.join('\n'));
  //     f.close();
  //   };
  //   maxNumOfImages = images.length;
  // });
  // if (didFetchedAllImages === true) {
  //   break;
  // }
  console.log('looping...');
};

casper.then(function() {
  var f = fs.open('result.txt', 'w');
  f.write(srcs.join('\n'));
  f.close();
});

casper.run();
