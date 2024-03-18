
var neofuse;
var searchfirstRun = true;

if (searchfirstRun) {
  loadNeoSearch();
  searchfirstRun = false;
}

function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          var data = JSON.parse(httpRequest.responseText);
          if (callback) callback(data);
        }
      }
    };
  httpRequest.open('GET', path);
  httpRequest.send();
}

function loadNeoSearch() {
    // in head
    const lang = document.querySelector(' > meta[name="lang"]')?.getAttribute?.('content')
    // or in html
    //const lang = document.documentElement.lang
    // like "/zh-tw/index.json", if $lang exist use /xxx/index.json else /index.json 
    console.log("lang head"); 
    console.log(lang); 
    const lang2 = document.documentElement.lang
    console.log("lang html"); 
    console.log(lang2); 
}