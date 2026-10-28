import random
import string


def get_random_combination(word_length, letters, allow_repeats):
    if allow_repeats:
        return [random.choice(letters) for _ in range(word_length)]
    return random.sample(letters, word_length)


class Game:
    def __init__(self, game_id, word_length=4, letter_count=6,
                 allow_repeats=True, max_guesses=10) -> None:
        self.game_id = str(game_id)
        self.status = "active"
        self.word_length = word_length
        self.letter_count = letter_count
        self.letters = list(string.ascii_uppercase[:letter_count])
        self.guess_number = 0
        self.max_guesses = max_guesses
        self.allow_repeats = allow_repeats
        self.secret_word = get_random_combination(
            word_length, self.letters, allow_repeats)
