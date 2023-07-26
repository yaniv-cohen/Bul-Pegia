def get_marks( guessed_word, target_word):
    return get_marks_for_guess(guessed_word[:], target_word[:])

def get_marks_for_guess(word1, word2):
    output_black = 0
    i=0
    print(word1, word2)
    while(i<len(word1)):
        char=word1[i]
        if(char == word2[i]):
            output_black+=1
        i+=1
    i=0
    output_white = 0
    checked = ['']
    while(i<len(word1)):
        char = word1[i]
        if(checked.count(word1[i])==0):
            output_white += min(word1.count(char), word2.count(char))
            checked.append(char)
        i+=1
        
    
    return [output_black, output_white -output_black]