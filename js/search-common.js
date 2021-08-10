function parseURLParams(url) {
    let queryStart = url.indexOf("?") + 1;
    let queryEnd   = url.indexOf("#") + 1 || url.length + 1;
    let query = url.slice(queryStart, queryEnd - 1);
    let pairs = query.split("&");
    let params = {};

    if (query === url || query === "") {
        return [];
    }

    for (let i = 0; i < pairs.length; i++) {
        let eqIndex = pairs[i].indexOf("=");
        if (eqIndex < 0){
            continue;
        }
        let key = decodeURIComponent(pairs[i].slice(0, eqIndex));
        let value = decodeURIComponent(pairs[i].slice(eqIndex + 1));
        params[key] = value;
    }
    return params;
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
