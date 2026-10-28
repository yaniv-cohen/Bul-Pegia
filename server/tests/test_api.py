import pytest

from server.app import create_app


@pytest.fixture
def app():
    return create_app()


@pytest.fixture
def client(app):
    return app.test_client()


def new_game(app, client, path="/createNewGame/4/6/1/3", secret="ABCD"):
    response = client.get(path)
    assert response.status_code == 200
    game_id = response.get_data(as_text=True)
    app.extensions["games"][game_id].secret_word = list(secret)
    return game_id


def test_create_game_uses_defaults(app, client):
    game_id = client.get("/createNewGame").get_data(as_text=True)
    game = app.extensions["games"][game_id]
    assert (game.word_length, game.letter_count, game.allow_repeats, game.max_guesses) == (4, 6, True, 10)


def test_active_guess(app, client):
    game_id = new_game(app, client)
    body = client.get(f"/game/{game_id}/guess/ABDC").get_json()
    assert body == {
        "inputWord": "ABDC",
        "result": {"black": 2, "white": 2},
        "turns": 1,
        "gameId": game_id,
        "status": "active",
    }


def test_lowercase_guess_is_accepted(app, client):
    game_id = new_game(app, client)
    assert client.get(f"/game/{game_id}/guess/abcd").get_json()["status"] == "won"


def test_win(app, client):
    game_id = new_game(app, client)
    body = client.get(f"/game/{game_id}/guess/ABCD").get_json()
    assert body["status"] == "won"
    assert body["result"] == {"black": 4, "white": 0}
    assert body["secretWord"] == list("ABCD")
    assert body["maxTurns"] == 3
    assert body["allowRepeats"] == "1"
    assert body["numberOfColors"] == 6


def test_win_on_last_turn(app, client):
    game_id = new_game(app, client)
    client.get(f"/game/{game_id}/guess/AAAA")
    client.get(f"/game/{game_id}/guess/BBBB")
    assert client.get(f"/game/{game_id}/guess/ABCD").get_json()["status"] == "won"


def test_lose_after_max_guesses(app, client):
    game_id = new_game(app, client)
    statuses = [client.get(f"/game/{game_id}/guess/EEEE").get_json()["status"] for _ in range(3)]
    assert statuses == ["active", "active", "lost"]


def test_guess_after_game_over_is_conflict(app, client):
    game_id = new_game(app, client)
    client.get(f"/game/{game_id}/guess/ABCD")
    response = client.get(f"/game/{game_id}/guess/ABCD")
    assert response.status_code == 409
    assert response.get_json()["status"] == "won"


def test_unknown_game_is_not_found(client):
    response = client.get("/game/nope/guess/ABCD")
    assert response.status_code == 404
    assert "error" in response.get_json()


@pytest.mark.parametrize("bad_guess", ["ABC", "ABCDE", "ABCZ", "AB1D"])
def test_invalid_guess_is_bad_request(app, client, bad_guess):
    game_id = new_game(app, client)
    response = client.get(f"/game/{game_id}/guess/{bad_guess}")
    assert response.status_code == 400
    # an invalid guess does not use up a turn
    assert app.extensions["games"][game_id].guess_number == 0


@pytest.mark.parametrize("path", [
    "/createNewGame/x/6/1/10",
    "/createNewGame/4/6/2/10",
    "/createNewGame/0/6/1/10",
    "/createNewGame/4/27/1/10",
    "/createNewGame/4/6/1/0",
    "/createNewGame/5/4/0/10",
])
def test_invalid_game_settings_are_bad_request(client, path):
    assert client.get(path).status_code == 400


def test_game_count(app, client):
    assert client.get("/gameCount").get_data(as_text=True) == "0"
    new_game(app, client)
    new_game(app, client)
    assert client.get("/gameCount").get_data(as_text=True) == "2"
