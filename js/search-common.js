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

function doesElementListMatchElementSearchNot(elementSearch, elementList, matchFunction){
    elementSearch = elementSearch.trim();
    var invert = elementSearch.startsWith('!');
    if (invert){
        elementSearch = elementSearch.substring(1).trim();
    }
    return invert ^ matchFunction(elementSearch, elementList);
}

function doesElementListMatchElementSearchAnd(elementSearch, elementList, matchFunction){
    var elementSearchArr = elementSearch.split('&');
    for (var i = 0; i < elementSearchArr.length; i++){
        if (!doesElementListMatchElementSearchNot(elementSearchArr[i], elementList, matchFunction)){
            return false;
        }
    }
    return true;
}

function doesElementListMatchElementSearch(elementSearch, elementList, matchFunction){
    var elementSearchArr = elementSearch.split('|');
    for (var i = 0; i < elementSearchArr.length; i++){
        if (doesElementListMatchElementSearchAnd(elementSearchArr[i], elementList, matchFunction)){
            return true;
        }
    }
    return false;
}
