
function getSourceSearchFromURL(url){
	var urlp  = parseURLParams(url);
	if (urlp && urlp.sourceSearch && urlp.sourceSearch.length > 0) {
		return urlp.sourceSearch[0];
	} else {
		return undefined;
	}
}

function doesSourceMatchSourceList(source, sourceList){
	var sourceListArr = sourceList.split(',');
    for (var j = 0; j < sourceListArr.length; j++){
    	var strippedSource = sourceListArr[j].split('.')[0].trim().toLowerCase();
        if (strippedSource === source.toLowerCase()){
            return true;
        }
    }
    return false;
}

function runSourceSearch(){
	var lis = document.getElementsByTagName("li");
  	var query = document.getElementById("sourceSearchBar").value;
  	var invalid = !query || query === "";
  	for (var i = 0; i < lis.length; i++){
  		var li = lis[i];
  		if (li.dataset && li.dataset.sources){
  			var sourceList = li.dataset.sources;
	  		if (!invalid && !doesElementListMatchElementSearch(query, sourceList, doesSourceMatchSourceList)){
	  			li.classList.add("sourcesearch-hide");
	  		} else {
	  			li.classList.remove("sourcesearch-hide");
	  		}
  		}
  	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	var ssb = document.getElementById("sourceSearchBar");
	var ssu  = getSourceSearchFromURL(window.location.search);
	if (ssu) {
		ssb.value = ssu;
	}
	ssb.addEventListener("change", runSourceSearch);
	ssb.addEventListener("keydown", runSourceSearch);
	ssb.addEventListener("input", runSourceSearch);
	runSourceSearch();
});

