from getMarksForGuess import *
from getRandomCombination import getRandomCombination
import uuid
import random

class Game:
    def __init__(self, wordLength =4, letterCount =6, allowRepeats = True, MAX_GUESS=10) -> None:
        self.game_id = str(uuid.uuid1())
        self.status = "active"
        self.wordLength= wordLength
        self.letters= ["A","B","C", "D", "E", "F", "G", "H", "I", "J", "K"][:letterCount]
        self.colorMap=["Blue", "Green", "Yellow", "Orange", "Red", "Purple"]
        self.guess_number=0
        self.MAX_GUESS = MAX_GUESS
        self.allowRepeats = allowRepeats
        self.secret_word= getRandomCombination(self.wordLength, self.letters, self.allowRepeats)

    
    # def newProcessGuess(self, chars, word ,currentPossibleResults):
    #     [blacks, whites] = getMarksForGuess(chars[:], word[:])
    #     print(blacks, whites)
    #     print("Start with "+str(len(currentPossibleResults)) + " possibilities.")
    #     currentPossibleResults= logicOnResults(blacks, whites, chars, self.locations, self.usedLetters, currentPossibleResults)
    #     print("Now only have  "+str(len(currentPossibleResults)) + " possibilities.")
    #     return currentPossibleResults
    # def processGuess(self, guessed_word, target_word ,currentPossibleResults):
    #     [blacks, whites] = getMarksForGuess(guessed_word[:], target_word[:])
    #     print(blacks, whites)
    #     print("Start with "+ str(len(currentPossibleResults)) + " possibilities.")
    #     currentPossibleResults= logicOnResults(blacks, whites, guessed_word, self.locations, self.usedLetters, currentPossibleResults)
    #     print("Now only have  "+str(len(currentPossibleResults)) + " possibilities.")
    #     return currentPossibleResults
 
def getNumbers(input_word):
    return ' '.join({ str(len(input_word)), str(len(input_word)/2)})

