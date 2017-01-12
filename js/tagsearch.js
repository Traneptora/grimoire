function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") {
        return;
    }

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

function getTagSearchFromURL(url){
	var urlp  = parseURLParams(url);
	if (urlp && urlp.tagSearch && urlp.tagSearch.length > 0) {
		return urlp.tagSearch[0];
	} else {
		return undefined;
	}
}

function doesTagListMatchTag(tag, tagList){
	tag = tag.trim();
	var tagListArr = tagList.split(',');
	var invert = tag.startsWith('!');
	if (invert){
		tag = tag.substring(1).trim();
	}
	for (var j = 0; j < tagListArr.length; j++){
		if (tagListArr[j].trim().toLowerCase() === tag.toLowerCase()){
			return !invert;
		}
	}
	return invert;
}

function doesTagListMatchTagSearchAnd(tagSearch, tagList){
	var tagSearchArr = tagSearch.split('&');
	for (var i = 0; i < tagSearchArr.length; i++){
		if (!doesTagListMatchTag(tagSearchArr[i], tagList)){
			return false;
		}
	}
	return true;
}

function doesTagListMatchTagSearch(tagSearch, tagList){
	var tagSearchArr = tagSearch.split('|');
	for (var i = 0; i < tagSearchArr.length; i++){
		if (doesTagListMatchTagSearchAnd(tagSearchArr[i], tagList)){
			return true;
		}
	}
	return false;
}


function runTagSearch(){
	var lis = document.getElementsByTagName("li");
  	var query = document.getElementById("tagSearchBar").value;
  	var invalid = !query || query === "";
  	for (var i = 0; i < lis.length; i++){
  		var li = lis[i];
  		if (li.dataset && li.dataset.tags){
  			var tagList = li.dataset.tags;
	  		if (!invalid && !doesTagListMatchTagSearch(query, tagList)){
	  			li.classList.add("hide");
	  		} else {
	  			li.classList.remove("hide");
	  		}
  		}
  	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	var tsb = document.getElementById("tagSearchBar");
	var tsu  = getTagSearchFromURL(window.location.search);
	if (tsu) {
		tsb.value = tsu;
	}
	tsb.addEventListener("change", runTagSearch);
	tsb.addEventListener("keydown", runTagSearch);
	tsb.addEventListener("input", runTagSearch);
	runTagSearch();
});

