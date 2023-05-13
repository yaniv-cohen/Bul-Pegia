import getMarksForGuess
def getNextPossibleResults(currentPossible: list, targetBlacks, targetWhites, usedLetters, chars):
    print( f" possibilities, filter using  {str(targetBlacks)} {str(targetWhites)} - chars: {chars}")
    count = 0
    newPossibilities =[]
    for possibility in currentPossible:
    # print("count" + str(count))
        count+=1
        marksForPossibility = getMarksForGuess.getMarksForGuess(chars[:],possibility[:])
        # isSameMarks = 
        if(marksForPossibility == [targetBlacks,targetWhites] ):
            newPossibilities.append(possibility)
            # print("@@@@adding" + str(possibility))
            print("got " +str(marksForPossibility) +" for "+ str(possibility) +' ' + str(isSameMarks)) 
        # else:
            # print("skipping" + str(possibility))
    return newPossibilities