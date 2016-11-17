chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
}, function(selection) {
    if (!selection || !selection[0])
    {
        document.getElementById('output').innerText = "No vocabulary highlighted, please highlight a vocabulary and try again.";
        return;
    }
    
    var pattern = /<(.*)>/;
    if (pattern.test(selection[0]))
    {
        document.getElementById('output').innerText = "HTML tag(s) detected, please don't highlight the HTML tag(s) and try again.";
        return;
    }
    
    var vocabs = JSON.parse(_data);
    var isFound = false;
    for (var i = 0; i < vocabs.length; ++i) {
        var vocab = vocabs[i]['vocab'];
        if (vocab == selection[0]) {
            isFound = true;
            
            var str = '';
            
            for (var j = 0; j < vocabs[i]['tags'].length; ++j) {
                str += '[' + vocabs[i]['tags'][j] + ']';
            }
            
            document.getElementById('output').innerText = str;
            break;
        }
    }

    if (!isFound) {
        document.getElementById('output').innerText = 'Vocabulary not found';
    }

    var address = 'http://www.dictionary.com/browse/' + selection[0];
    
    var link = document.createElement('a');
    link.setAttribute('href', address);
    link.setAttribute('target', '_blank');
    link.innerText = 'Dictionary';
    
    document.getElementById('dict').appendChild(link);
});
