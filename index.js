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
  var srcs = [];
  casper.thenOpen('http://www.pexels.com/search/' + query + '/', function() {
    var maxNumOfImages = 0;

    for (var i = 0; i < 20; i++) {
      casper.then(function() {
        this.wait(1000);
        srcs = this.evaluate(function() {
          window.scroll(0, 10000);
          var images = document.getElementsByTagName('img');
          var srcList = [];
          for (var i = 0; i < images.length; i++) {
            srcList.push(images[i].src);
          }
          return srcList;
        });
        casper.log(srcs.length, "debug");
      });
      // if (srcs.length === maxNumOfImages) {
      //   casper.log("zero zero", "debug");
      //   break;
      // }
      maxNumOfImages = srcs.length;
      console.log('looping...');
    };
  });

  casper.then(function() {
    casper.log(srcs.length, "debug");
    var f = fs.open('results/' + query + '.txt', 'w');
    f.write(srcs.join('\n'));
    f.close();
  });

});

casper.run();
