
function getTagSearchFromURL(url){
	var urlp  = parseURLParams(url);
	if (urlp && urlp.tagSearch && urlp.tagSearch.length > 0) {
		return urlp.tagSearch[0];
	} else {
		return undefined;
	}
}

function doesTagMatchTagList(tag, tagList){
	var tagListArr = tagList.split(',');
    for (var j = 0; j < tagListArr.length; j++){
        if (tagListArr[j].trim().toLowerCase() === tag.toLowerCase()){
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
	  		if (!invalid && !doesElementListMatchElementSearch(query, tagList, doesTagMatchTagList)){
	  			li.classList.add("tagsearch-hide");
	  		} else {
	  			li.classList.remove("tagsearch-hide");
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

