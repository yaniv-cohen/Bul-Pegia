import getMarksForGuess
def getNextPossibleResults(currentPossible: list, targetBlacks, targetWhites, usedLetters, chars):
    print( f" possibilities, filter using  {str(targetBlacks)} {str(targetWhites)} - chars: {chars}")
    count = 0
    newPossibilities =[]
    for possibility in currentPossible:
    # print("count" + str(count))
        count+=1
        marksForPossibility = getMarksForGuess.getMarksForGuess(chars[:],possibility[:])
        isSameMarks = (marksForPossibility) == ([targetBlacks,targetWhites])
        if(isSameMarks ):
            newPossibilities.append(possibility)
            # print("@@@@adding" + str(possibility))
            print("got " +str(marksForPossibility) +" for "+ str(possibility) +' ' + str(isSameMarks)) 
        # else:
            # print("skipping" + str(possibility))
    return newPossibilities