'use strict';

chrome.browserAction.onClicked.addListener(function(tab) {
  let bg = chrome.extension.getBackgroundPage();

  bg.document.body.innerHTML= ""; // clear the background page
  var helper = null;
   

   if (helper == null) {
	   helper = bg.document.createElement("textarea");
	   helper.style.position = "absolute";
	   helper.style.border = "none";
	   // helper.style.fontSize = "1pt";
	   // helper.style.margin = "-100";
	   document.body.appendChild(helper);
   }
   helper.select(); 
   bg.document.execCommand("Paste");
   
   var data = helper.value;
  //bg.document.execCommand("Paste");
  var convertedData = {};
  const regex = /<tr><td>(.*?)<\/td><td>(.*?)<\/td><\/tr>/gm;
  let m;
  while ((m = regex.exec(data)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      let key='';
      let val='';
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
          console.log(`Found match, group ${groupIndex}: ${match}`);
          //convertedData[]
          if (groupIndex==1) key = match;
          if (groupIndex==2) val = match;
      });
      convertedData[key]=val;
  }
  //chrome.tabs.executeScript(tab.id, {file: 'content.js'});
  //console.log(window.location);
  chrome.tabs.sendMessage(tab.id, {method: "getSelection", data: convertedData }, function(response) {
	  if (response) { 
		  //console.log("SVDronten, Response: " + JSON.stringify(response));
	  } else {
      //console.log("SVDronten, empty response");
      //alert("SVDronten kont niet met pagina paraten. Check extension settings.")
	  
	  }
	});
});

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
      // do nothing...
    });
});