from collections import Counter


def get_marks(guess, secret):
    """Return (blacks, whites) for a guess against the secret.

    Blacks are right colors in the right place, whites are right colors
    in the wrong place.
    """
    blacks = sum(g == s for g, s in zip(guess, secret))
    common = sum((Counter(guess) & Counter(secret)).values())
    return blacks, common - blacks
