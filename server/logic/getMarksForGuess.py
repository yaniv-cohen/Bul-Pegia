def getMarksForGuess(word1, word2):
    outputBlack = 0
    i=0
    print(word1, word2)
    while(i<len(word1)):
        char=word1[i]
        if(char == word2[i]):
            outputBlack+=1
            # word2[i]=""
            # word1[i]=""
        i+=1
    i=0
    outputWhite = 0
    checked = ['']
    while(i<len(word1)):
        char = word1[i]
        if(checked.count(word1[i])==0):
            outputWhite += min(word1.count(char), word2.count(char))
            checked.append(char)
        i+=1
        
    
    return [outputBlack, outputWhite -outputBlack]