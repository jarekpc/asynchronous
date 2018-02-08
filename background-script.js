var portFromCS;



function connected(p) {
  portFromCS = p;
  //
  function handleMessage(request, sender, sendResponse) {
    //
    var reader  = new FileReader();
    if(request){
      reader.readAsDataURL(request.content);//??
    }

    var newName = (request.fileName).replace('a','z');

    setTimeout(() => {
      sendResponse({response: "async response from background script",req : reader.result, fileName : newName});
    }, 1000);
  return true;

    //
    //
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve({response: "async response from background script", req : reader.result, fileName : newName});
    //   }, 1000);
    // });
    //
  }

  browser.runtime.onMessage.addListener(handleMessage);
  /*
  portFromCS.onMessage.addListener(function(m) {
    console.log("In background script, received message from content script")
    console.log(m.greeting);

  });
  */
}

browser.runtime.onConnect.addListener(connected);
