from get_random_combination import get_random_combination

class Game:
    def __init__(self, id, word_length =4, 
                 letter_count =6, allow_repeats = True,
                 max_guesseses=10) -> None:
        self.game_id = str(id)
        self.status = "active"
        self.word_length= word_length
        self.letter_count = letter_count
        self.letters= ["A","B","C", "D", "E", "F", "G", "H", "I", "J", "K"][:letter_count]
        self.color_map=["Blue", "Green", "Yellow", "Orange", "Red", "Purple"]
        self.guess_number=0
        self.max_guesses = max_guesseses
        self.allow_repeats = allow_repeats
        self.secret_word= get_random_combination(self.word_length, self.letters, self.allow_repeats)

    
def get_numbers(input_word):
    return ' '.join({ str(len(input_word)), str(len(input_word)/2)})

