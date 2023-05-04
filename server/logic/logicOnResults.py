import itertools
import utils
import getMarksForGuess
import getNextPossibleResults
def logicOnResults(blacks, whites,chars, locations , usedLetters,currentPossibleResults ):
    print(blacks, whites,chars,  usedLetters)
    if(blacks==4):
        print("you Won!")


    if(blacks==0):
        for i in range(len(chars)):
            if(chars[i] in locations[i]):
                locations[i].remove(chars[i])
    if(whites==0):
        for i in range(len(chars)):
            locations[i]:list.remove(chars)
    if(blacks+whites==4):
        for char in enumerate(chars):
            usedLetters.append(char)        
        for i in range(len(locations)):
            locations[i-1] = chars    
    if(blacks==0 and whites==4):
        for i in range(len(locations)):
            locations[i-1].remove(chars[i-1])
            # locations.remove()
    elif(blacks+whites==0):
        for  i in range(len(locations)):
            if(chars[i] in locations[i]):
                locations[i-1].remove(chars)
    # print(str(currentPossibleResults))
    initialLength = len(currentPossibleResults)

    newAllpossibilities = getNextPossibleResults.getNextPossibleResults(currentPossibleResults[:], blacks, whites, usedLetters[:], chars[:])

    currentPossibleResults=newAllpossibilities

    return currentPossibleResults
    # print("newAllpossibilities"+str(newAllpossibilities))

