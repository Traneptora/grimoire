function atomMatches(atom, tagArray) {
    let flip = false;
    while (atom.startsWith('!')){
        atom = atom.substring(1);
        flip = !flip;
    }
    const value = atom === '' || atom === 'true' || atom !== 'false' && tagArray.includes(atom);
    return flip ^ value;
}

function matchTagList0(query, tagArray) {
    const parenRegex = /\([^\(\)]*\)/;
    let newQuery = query;
    do {
        query = newQuery;
        newQuery = query.replace(parenRegex, (m) => {
            const v = matchTagList0(m.slice(1, -1), tagArray);
            return v ? 'true' : 'false';
        });
    } while (newQuery !== query);

    return newQuery.split('|').some((part) => part.split('&').every((part2) => atomMatches(part2, tagArray)));
}

function matchTagList(searchQuery, tagList){
    const tagArray = tagList.split(',').map((tag) => tag.replaceAll(/\s+/g, '').replaceAll(/\..*$/g, '').toLowerCase());
    return matchTagList0(searchQuery.replaceAll(/\s+/g, ''), tagArray);
}

function runTagSearch(bar, dataEntry, classPrefix){
    const searchQuery = document.getElementById(bar).value.toLowerCase();
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

async function ready() {
    const tagSearchBar = document.getElementById("tagSearchBar");
    if (!tagSearchBar) {
        return;
    }
    const sourceSearchBar = document.getElementById("sourceSearchBar");
    const params = new URLSearchParams(window.location.search);
    if (params.get("tagSearch")){
        tagSearchBar.value = params.get("tagSearch");
    }
    if (params.get("sourceSearch")){
        sourceSearchBar.value = params.get("sourceSearch");
    }
    const tagSearch = async (event) => runTagSearch("tagSearchBar", "tags", "tagsearch");
    tagSearchBar.addEventListener("change", tagSearch);
    tagSearchBar.addEventListener("keydown", tagSearch);
    tagSearchBar.addEventListener("input", tagSearch);
    const sourceSearch = async (event) => runTagSearch("sourceSearchBar", "sources", "sourcesearch");
    sourceSearchBar.addEventListener("change", sourceSearch);
    sourceSearchBar.addEventListener("keydown", sourceSearch);
    sourceSearchBar.addEventListener("input", sourceSearch);
    return Promise.all([tagSearch(), sourceSearch()]);
}

document.addEventListener("DOMContentLoaded", ready);

/* jets initialization */
var jets = null;
document.addEventListener('DOMContentLoaded', () => {
    const menuClick = () => {
        const menu = document.getElementById('menu');
        if (menu.className.match(/(?:^|\s)show(?!\S)/)) {
            menu.className = menu.className.replace( /(?:^|\s)show(?!\S)/g, '');
        } else {
            menu.className += ' show';
        }
        const menu2 = document.getElementById('menu2');
        if (menu2.className.match(/(?:^|\s)show(?!\S)/)) {
            menu2.className = menu2.className.replace(/(?:^|\s)show(?!\S)/g, '');
        } else {
            menu2.className += ' show';
        }
    };
    document.getElementById('menuIcon').addEventListener('click', menuClick);
    if (document.getElementById('jetsSearch')) {
        jets = new Jets({
            searchTag: '#jetsSearch',
            contentTag: '.jetsContent',
            didSearch: (search_phrase) => {
                const elements = document.getElementsByClassName('jetsHide');
                if (!search_phrase.trim()) {
                    for (let i = 0; i < elements.length; i++) {
                        elements[i].classList.remove('searchHide');
                    }
                } else {
                    for (let i = 0; i < elements.length; i++) {
                        elements[i].classList.add('searchHide');
                    }
                }
            },
        });
    }
});
