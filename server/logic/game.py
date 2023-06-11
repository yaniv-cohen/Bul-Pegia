from getMarksForGuess import *
from logicOnResults import logicOnResults
import itertools
import uuid
import random

class Game:
    def __init__(self, wordLength =4) -> None:
        self.game_id = str(uuid.uuid1())
        self.wordLength= wordLength
        self.letters= ["A","B","C", "D", "E", "F"]
        self.colorMap=["Blue", "Green", "Yellow", "Orange", "Red", "Purple"]
        self.allPossibleCombinations = []
        self.secret_word= self.getRandomCombination()
        self.guess_number=1
        self.currentPossibleResults= self.allPossibleCombinations[:]
        print("My secret word is: " + str(self.secret_word))
        self.usedLetters= []
        self.locations = [self.letters[:]*4]
        self.MAX_GUESS =10
    #     self.possibleGuesses = self.permu(self.letters, {}) 
    #     print(str(self.possibleGuesses))

    # def permu(lists, allPossibleCombinations, prefix = '' ):
    #     if not lists:
    #         allPossibleCombinations.append(list(prefix))
    #         return
    #     first = lists[0]
    #     rest = lists[1:]
    #     for letter in first:
    #         permu(rest, prefix + letter)

    def getRandomCombination(self):
        output = []
        while(len(output)<self.wordLength):
            output.append(random.choice(self.letters))
        return output
    def getMarks(self, guessed_word, target_word):
        [blacks, whites] = getMarksForGuess(guessed_word[:], target_word[:])
        print(blacks, whites)
        return [blacks, whites]
    
    def newProcessGuess(self, chars, word ,currentPossibleResults):
        [blacks, whites] = getMarksForGuess(chars[:], word[:])
        print(blacks, whites)
        print("Start with "+str(len(currentPossibleResults)) + " possibilities.")
        currentPossibleResults= logicOnResults(blacks, whites, chars, self.locations, self.usedLetters, currentPossibleResults)
        print("Now only have  "+str(len(currentPossibleResults)) + " possibilities.")
        return currentPossibleResults
    def processGuess(self, guessed_word, target_word ,currentPossibleResults):
        [blacks, whites] = getMarksForGuess(guessed_word[:], target_word[:])
        print(blacks, whites)
        print("Start with "+str(len(currentPossibleResults)) + " possibilities.")
        currentPossibleResults= logicOnResults(blacks, whites, guessed_word, self.locations, self.usedLetters, currentPossibleResults)
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