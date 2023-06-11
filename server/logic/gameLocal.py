import getMarksForGuess
import getRandomCombination
import uuid


def permu(lists, allPossibleCombinations, prefix = '' ):
    if not lists:
        allPossibleCombinations.append(list(prefix))
        return
    first = lists[0]
    rest = lists[1:]
    for letter in first:
        permu(rest, prefix + letter)

class Game:
    def __init__(self) -> None:
        self.game_id = str(uuid.uuid1())
        self.secret_word= str(uuid.uuid1())
        print("My secret word is: " + self.secret_word)
        # self.secret_word = self.main()
        # print("self.secret_word: "+self.secret_word)
    def getSecretWord(wordLength, letters, colorMap, ):
        a=2
    def main():
        wordLength=4
        letters= ["A","B","C", "D", "E", "F"]
        colorMap = ["Blue", "Green", "Yellow", "Orange", "Red", "Purple"]

        allPossibleCombinations = []
        locations = [letters[:],letters[:],letters[:],letters[:]]

        permu(locations, allPossibleCombinations)

        usedLetters= []
        guessNumber=1
        currentPossibleResults = allPossibleCombinations[:]
        def getNextGuess(guessNumber):
            print("Enter guess number "+ str(guessNumber) )
            wordInput =  input() 
            chars = list(wordInput.upper())
            print(chars)
            return chars

        def processGuess(chars, word ,currentPossibleResults):
            [blacks, whites] = getMarksForGuess.getMarksForGuess(chars[:], word[:])
            print(blacks, whites)
            print("Start with "+str(len(currentPossibleResults)) + " possibilities.")
            currentPossibleResults= logicOnResluts(blacks, whites, chars, locations, usedLetters, currentPossibleResults)
            print("Now only have  "+str(len(currentPossibleResults)) + " possibilities.")
            return currentPossibleResults
        word = getRandomCombination.getRandomCombination(letters )
        # print('secret word is '+str(word))
        index =0 
        while(index<len(locations)):
            print(str(index)+":"+str(locations[index]))
            index+=1
        while(guessNumber<10):
            chars = getNextGuess(guessNumber)
            print ("entered "+ ( str(chars)))
            # print ("entered "+ utils.lettersToColor( str(chars)))
            currentPossibleResults = processGuess(chars, word[:], currentPossibleResults )
            guessNumber+= 1
 
def getNumbers(input_word):
    return ' '.join({ str(len(input_word)), str(len(input_word)/2)})