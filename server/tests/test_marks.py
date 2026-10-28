import pytest

from server.marks import get_marks


@pytest.mark.parametrize("guess, secret, blacks, whites", [
    ("ABCD", "ABCD", 4, 0),
    ("ABCD", "ABCE", 3, 0),
    ("ABAB", "ABEE", 2, 0),
    ("ABAB", "AEEE", 1, 0),
    ("ABCD", "BEEE", 0, 1),
    ("ABCD", "BCEE", 0, 2),
    ("ABCD", "BCDE", 0, 3),
    ("ABCD", "BCDA", 0, 4),
    ("AABB", "BBAA", 0, 4),
    ("ABBB", "BBAA", 1, 2),
    ("ABAB", "BABA", 0, 4),
    ("BBAB", "ABBB", 2, 2),
    ("BABC", "BCAB", 1, 3),
    ("BABC", "BCAE", 1, 2),
    ("BABC", "BCEE", 1, 1),
    ("BABC", "BEEE", 1, 0),
    # repeated colors in the guess only count once per matching secret color
    ("AAAA", "ABCD", 1, 0),
    ("AAAB", "BAAA", 2, 2),
    ("ABCDEF", "FEDCBA", 0, 6),
])
def test_get_marks(guess, secret, blacks, whites):
    assert get_marks(list(guess), list(secret)) == (blacks, whites)
