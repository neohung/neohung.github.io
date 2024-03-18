
var neofuse;
var searchfirstRun = true;
var postGroupAll = document.querySelectorAll('.post-group');
//var searchPostGroup = document.querySelector('.search-post-group');

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
    const lang = document.documentElement.lang
    // like "/zh-tw/index.json", if $lang exist use /xxx/index.json else /index.json 
    fetchJSONFile(`${lang ? "/" + lang : ""}/index.json`, function (data) {
        //console.log(data)
        var options = { // fuse.js options; check fuse.js website for details
          shouldSort: true,
          location: 0,
          distance: 100,
          threshold: 0.4,
          minMatchCharLength: 2,
          keys: [
            'title',
            'permalink',
            'contents'
         ]
        };
        neofuse = new Fuse(data, options);
    });
    document.querySelector('.neosearch-ui input').onkeyup = function (e) {
        executeNeoSearch(this.value);
    } 
}

function executeNeoSearch(term) {
    const searchResult = neofuse.search(term);
    console.log(searchResult);
    if (term === "") {
        postGroupAll.forEach((item) => {
            item.removeAttribute('hidden');
        });
    }else{
        postGroupAll.forEach((item) => {
            item.setAttribute('hidden', "");
        });
    }
}