#!/usr/bin/env node

'use strict';
var casper = require('casper').create({
  verbose: true,
  logLevel: 'debug'
});

casper.start('http://www.pexels.com');

var fs = require('fs');

var targetsJson = require('./targets.json');
var targets = targetsJson.targets;
targets.forEach(function(query, index, array) {
  casper.open('http://www.pexels.com/search/' + query + '/');

  var maxNumOfImages = 0;
  var srcs = [];

  for (var i = 0; i < 20; i++) {
    casper.then(function() {
      this.wait(1000);
      srcs = this.evaluate(function() {
        window.scrollBy(0, 1000);
        var images = document.getElementsByTagName('img');
        var src_list = [];
        for (var i = 0; i < images.length; i++) {
          src_list.push(images[i].src);
        }
        return src_list;
      });
    });
    if (srcs.length === maxNumOfImages) {
      break;
    }
    maxNumOfImages = srcs.length;
    console.log('looping...');
  };

  casper.then(function() {
    var f = fs.open(query + '.txt', 'w');
    f.write(srcs.join('\n'));
    f.close();
  });


});
casper.run();
