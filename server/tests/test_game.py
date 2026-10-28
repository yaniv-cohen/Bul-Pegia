from server.game import Game, get_random_combination


def test_secret_has_right_length_and_alphabet():
    for _ in range(50):
        game = Game("id", word_length=5, letter_count=3, allow_repeats=True)
        assert len(game.secret_word) == 5
        assert set(game.secret_word) <= {"A", "B", "C"}


def test_no_repeats_gives_unique_letters():
    for _ in range(50):
        game = Game("id", word_length=6, letter_count=6, allow_repeats=False)
        assert sorted(game.secret_word) == list("ABCDEF")


def test_random_combination_does_not_mutate_letters():
    letters = list("ABCDEF")
    get_random_combination(4, letters, allow_repeats=False)
    assert letters == list("ABCDEF")
