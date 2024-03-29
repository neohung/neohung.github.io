
var neofuse;
var searchfirstRun = true;
var postGroupAll = document.querySelectorAll('.post-group');
var searchPostGroup = document.querySelector('.search-post-group');
var noSearchResults = document.querySelector('.noSearchResults');
var neoRearchList = document.querySelector('.neosearch-list');
var neolistfirst = neoRearchList.firstChild; 
var neolistlast = neoRearchList.lastChild; 

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
    // export the result for debug
    console.log(searchResult);
    if (term === "" || term.length === 1) {
        // Hide the search result and show ost-group
        postGroupAll.forEach((item) => {
            item.removeAttribute('hidden');
        });
        searchPostGroup.setAttribute('hidden', "");
    }else{
        // Hide the post-group and show the search resutlt
        postGroupAll.forEach((item) => {
            item.setAttribute('hidden', "");
        });
        searchPostGroup.removeAttribute('hidden');
        // Check if has search result
        if (searchResult.length === 0) {
            // show no result
            neoRearchList.innerHTML = '';
            noSearchResults.removeAttribute('hidden');
        } else {
            // hide no result and show result
            noSearchResults.setAttribute('hidden', "");
            buildResultList(searchResult);
        } 
    }
}

function buildResultList(results) {
    var searchitems = '';
    for (let itemnum in results.slice(0, 10)) { // only show first 5 results
        searchitems = searchitems + '<li>';
        searchitems = searchitems + '<a class="link" href='+results[itemnum].item.permalink+'>'
           +results[itemnum].item.title+'</a>';
        //new Date(results[itemnum].item.date).toUTCString().substring(0, 16) 
        // Expected output: "Wed, 14 Jun 2017 07:00:00 GMT"
        searchitems = searchitems + '<time>' + new Date(results[itemnum].item.date).toUTCString().substring(4, 16) + '</time>';
        searchitems = searchitems + '</li>';
        //searchitems = searchitems + '<p style="margin-left:25px;">' + results[itemnum].item.contents + '</p>';
    }
    neoRearchList.innerHTML = searchitems;
    if (results.length > 0) {
        neolistfirst = neoRearchList.firstChild.firstElementChild; // first result container — used for checking against keyboard up/down location
        neolistlast = neoRearchList.lastChild.firstElementChild; // last result container — used for checking against keyboard up/down location
    }
}