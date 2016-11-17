import io, json
import glob
import os

data = []

files = glob.glob("VocabularySets/*.txt")
for file in files:
    fname = os.path.splitext(os.path.basename(file))[0]
    with open(file, "r") as ins:
        arr = []
        for line in ins:
            line = line.strip('\n')
            line = line.strip('\r')
            arr.append(line)
        
        for ele in arr:
            print ele
            isVocabFound = False
            for obj in data:
                if obj['vocab'] == ele:
                    isVocabFound = True
                    isTagFound = False
                    for tag in obj['tags']:
                        if tag == fname:
                            isTagFound = True
                    
                    if not isTagFound:
                        obj['tags'].append(fname)
                
            if not isVocabFound:
                data.append({'vocab':ele, 'tags':[fname]})

str = json.dumps(data)
str = "var _data = '" + str + "';"

with open("GoogleChromeExtension/data.js", "w") as jsFile:
    jsFile.write(str)
                
#with io.open('data.json', 'w', encoding='utf-8') as f:
#    f.write(unicode(json.dumps(data, ensure_ascii=False)))
