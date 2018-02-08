var myPort = browser.runtime.connect('eSamboScanner@skg.pl');
//fukncja dla weba
const firstLink = document.querySelector("a");
window.addEventListener("click", sendMessage);
Components.utils.import("resource://gre/modules/osfile.jsm")
Components.utils.import("resource://gre/modules/Task.jsm")


function testReadFile() {
  console.log("testReadFile");
  //let promise = File.move("aa.txt", "newnameaa.txt", {noOverwrite:true});
  let decoder = new TextDecoder();        // This decoder can be reused for several reads
  let promise = OS.File.read("aa.txt"); // Read the complete file as an array
  promise = promise.then(
    function onSuccess(array) {
      console.log(decoder.decode(array));        // Convert this array to a text
    }
  );
}

function checkPlugin() {
  testReadFile();
  return true;
}

exportFunction(checkPlugin, window, {defineAs:'checkPlugin'});
//main
function setFileContent(a){
  var sending = browser.runtime.sendMessage({content: a, fileName: a.name});
  sending.then(handleResponse);
  //read file
}

exportFunction(setFileContent, window, {defineAs:'setFileContent'});

///odpowiedz??
function handleResponse(isBookmarked) {
  console.log(isBookmarked);
  if (isBookmarked) {
    document.getElementById("base64-file-content").innerHTML=isBookmarked.req;
    document.getElementById("rename-name").innerHTML="Zmiana nazwa pliku " + isBookmarked.fileName;
    //firstLink.classList.add("bookmarked");
  }
}

function sendMessage(e) {
  //var sending = browser.runtime.sendMessage({content: "message from the content script"});
  //sending.then(handleResponse, handleError);
  console.log(firstLink.href);
  var sending = browser.runtime.sendMessage({url: firstLink.href});
  sending.then(handleResponse);
}
/*
browser.runtime.sendMessage({
  url: firstLink.href
}).then(handleResponse);
*/
