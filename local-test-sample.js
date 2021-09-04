var browserstack = require('browserstack-local');

//creates an instance of Local
var bs_local = new browserstack.Local();

var bs_local_args = { 'key': 'sBgqBXHdBUu7mdkm7zsS', 'forceLocal': 'true'}

bs_local.start(bs_local_args, function() {
  console.log("Started BrowserStackLocal");

  //console.log(bs_local[isRunning])
  console.log('BrowserStackLocal running:', bs_local.isRunning());

  //test code goes here

  bs_local.stop(function() {
    console.log("Stopped BrowserStackLocal");
  });
});