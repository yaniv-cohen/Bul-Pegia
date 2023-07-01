import random
def getRandomCombination(wordLength, letters, allowRepeats):
    output = []
    if(allowRepeats):
        while(len(output)<wordLength):
            output.append(random.choice(letters))
    else:
        random.shuffle(letters)
        output.append(letters[:wordLength])
    print("SECRET WORD IS " + str(output))
    return output