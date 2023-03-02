import random
def getRandomCombination(availableLetters):
    output = []
    while(len(output)<4):
        output.append(random.choice(availableLetters))
    usedColors=[]
    for color in output:
        if(usedColors.count(color)==0):
            usedColors.append(color)
    return output

