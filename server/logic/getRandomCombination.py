import random
def getRandomCombination(wordLength, letters, allowRepeats):
    output = []
    # print("generating with "+ allowRepeats)
    if(allowRepeats=="1"):
        while(len(output)< wordLength):
            output.append(random.choice(letters))
    else:
        random.shuffle(letters)
        output=(letters[:wordLength])
    print("SECRET WORD IS " + str(output))
    return output