function matchTagList(searchQuery, tagList){
    const tagArray = tagList.split(',').map((tag) => tag.replaceAll(/\s+/g, '').replaceAll(/\..*$/g, '').toLowerCase());
    return searchQuery.toLowerCase().split('|').some((part) => part.split('&').every((part2) => {
        let atom = part2.replaceAll(/\s+/g, '');
        let flip = false;
        while (atom.startsWith('!')){
            atom = atom.substring(1);
            flip = !flip;
        }
        return flip ^ tagArray.includes(atom);
    }));
}

function runTagSearch(bar, dataEntry, classPrefix){
    const searchQuery = document.getElementById(bar).value;
    Array.from(document.querySelectorAll("li.post-link-container")).filter((elem) => {
        return !!elem.dataset[dataEntry];
    }).forEach((elem) => {
        if (!searchQuery || matchTagList(searchQuery, elem.dataset[dataEntry])){
            elem.classList.remove(classPrefix + "-hide");
        } else {
            elem.classList.add(classPrefix + "-hide");
        }
    });
}

function ready(){
    const tagSearchBar = document.getElementById("tagSearchBar");
    const sourceSearchBar = document.getElementById("sourceSearchBar");
    const params = new URLSearchParams(window.location.search);
    if (params.get("tagSearch")){
        tagSearchBar.value = params.get("tagSearch");
    }
    if (params.get("sourceSearch")){
        sourceSearchBar.value = params.get("sourceSearch");
    }
    const tagSearch = (event) => runTagSearch("tagSearchBar", "tags", "tagsearch");
    tagSearchBar.addEventListener("change", tagSearch);
    tagSearchBar.addEventListener("keydown", tagSearch);
    tagSearchBar.addEventListener("input", tagSearch);
    const sourceSearch = (event) => runTagSearch("sourceSearchBar", "sources", "sourcesearch");
    sourceSearchBar.addEventListener("change", sourceSearch);
    sourceSearchBar.addEventListener("keydown", sourceSearch);
    sourceSearchBar.addEventListener("input", sourceSearch);
    tagSearch();
    sourceSearch();
}

document.addEventListener("DOMContentLoaded", ready);
