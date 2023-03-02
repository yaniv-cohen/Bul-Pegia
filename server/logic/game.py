import getMarksForGuess
import logicOnResults
import itertools
import getRandomCombination
import utils
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
        self.wordLength=4
        self.letters= ["A","B","C", "D", "E", "F"]
        self.colorMap=["Blue", "Green", "Yellow", "Orange", "Red", "Purple"]
        self.allPossibleCombinations = []
        self.secret_word= getRandomCombination.getRandomCombination(self.letters)
        self.guess_number=1
        self.currentPossibleResults= self.allPossibleCombinations[:]
        print("My secret word is: " + str(self.secret_word))
        self.usedLetters= []
        self.locations = [self.letters[:]*4]
        self.MAX_GUESS =10
    def getMarks(self, guessed_word, target_word):
        [blacks, whites] = getMarksForGuess.getMarksForGuess(guessed_word[:], target_word[:])
        print(blacks, whites)
        return [blacks, whites]
        # index =0 
        # while(index<len(self.locations)):
        #     print(str(index)+":"+str(self.locations[index]))
        #     index+=1
        # while(self.guessNumber < self.MAX_GUESS):
        #     chars = self.getNextGuess(self.guessNumber)
        #     print ("entered "+ ( str(chars)))
        #     # print ("entered "+ utils.lettersToColor( str(chars)))
        #     self.currentPossibleResults = self.processGuess(chars, self.secret_word, self.currentPossibleResults )
        #     self.guessNumber+= 1
    def newProcessGuess(self, chars, word ,currentPossibleResults):
        [blacks, whites] = getMarksForGuess.getMarksForGuess(chars[:], word[:])
        print(blacks, whites)
        print("Start with "+str(len(currentPossibleResults)) + " possibilities.")
        currentPossibleResults= logicOnResults.logicOnResluts(blacks, whites, chars, self.locations, self.usedLetters, currentPossibleResults)
        print("Now only have  "+str(len(currentPossibleResults)) + " possibilities.")
        return currentPossibleResults
    def processGuess(self, guessed_word, target_word ,currentPossibleResults):
        [blacks, whites] = getMarksForGuess.getMarksForGuess(guessed_word[:], target_word[:])
        print(blacks, whites)
        print("Start with "+str(len(currentPossibleResults)) + " possibilities.")
        currentPossibleResults= logicOnResults.logicOnResluts(blacks, whites, guessed_word, self.locations, self.usedLetters, currentPossibleResults)
        print("Now only have  "+str(len(currentPossibleResults)) + " possibilities.")
        return currentPossibleResults
    def getNextGuess(guessNumber):
        print("Enter guess number "+ str(guessNumber) )
        wordInput =  input() 
        chars = list(wordInput.upper())
        print(chars)
        return chars
 
def getNumbers(input_word):
    return ' '.join({ str(len(input_word)), str(len(input_word)/2)})