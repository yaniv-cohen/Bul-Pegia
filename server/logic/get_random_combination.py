import random
def get_random_combination(word_length, letters, allow_repeats):
    if(allow_repeats=="1"):
        output = []
        while(len(output)< word_length):
            output.append(random.choice(letters))
        return output
    else:
        random.shuffle(letters)
        return(letters[:word_length])
    