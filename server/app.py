import uuid

from flask import Flask, jsonify
from flask_cors import CORS

from .game import Game
from .marks import get_marks

MAX_SLOTS = 10
MAX_LETTERS = 26


def error(message, status):
    return jsonify({"error": message}), status


def create_app():
    app = Flask(__name__)
    CORS(app)
    games = app.extensions["games"] = {}

    def new_game_id():
        length = 4
        game_id = uuid.uuid4().hex[:length]
        while game_id in games:
            length += 1
            game_id = uuid.uuid4().hex[:length]
        return game_id

    @app.route("/createNewGame")
    @app.route("/createNewGame/<slots_count>")
    @app.route("/createNewGame/<slots_count>/<letter_count>")
    @app.route("/createNewGame/<slots_count>/<letter_count>/<allow_repeats>")
    @app.route("/createNewGame/<slots_count>/<letter_count>/<allow_repeats>/<max_guesses>")
    def create_new_game(slots_count="4", letter_count="6", allow_repeats="1", max_guesses="10"):
        try:
            slots_count = int(slots_count)
            letter_count = int(letter_count)
            max_guesses = int(max_guesses)
        except ValueError:
            return error("slots, letter count and max guesses must be integers", 400)
        if allow_repeats not in ("0", "1"):
            return error("allow_repeats must be 0 or 1", 400)
        repeats = allow_repeats == "1"
        if not 1 <= slots_count <= MAX_SLOTS:
            return error(f"slots must be between 1 and {MAX_SLOTS}", 400)
        if not 1 <= letter_count <= MAX_LETTERS:
            return error(f"letter count must be between 1 and {MAX_LETTERS}", 400)
        if max_guesses < 1:
            return error("max guesses must be at least 1", 400)
        if not repeats and letter_count < slots_count:
            return error("without repeats, letter count must be at least the slot count", 400)

        game_id = new_game_id()
        games[game_id] = Game(game_id, slots_count, letter_count, repeats, max_guesses)
        app.logger.info("created game %s (%s slots, %s letters, repeats=%s)",
                        game_id, slots_count, letter_count, repeats)
        return game_id

    @app.route("/game/<game_id>/guess/<input_word>")
    def guess(game_id, input_word):
        game = games.get(game_id)
        if game is None:
            return error("game not found", 404)
        if game.status != "active":
            return jsonify({
                "error": "game is already over",
                "status": game.status,
                "secretWord": game.secret_word,
                "turns": game.guess_number,
                "gameId": game_id,
            }), 409

        guess_letters = list(input_word.upper())
        if len(guess_letters) != game.word_length:
            return error(f"guess must be {game.word_length} letters long", 400)
        if any(letter not in game.letters for letter in guess_letters):
            return error("guess contains letters outside the game's range", 400)

        game.guess_number += 1
        blacks, whites = get_marks(guess_letters, game.secret_word)
        if blacks == game.word_length:
            game.status = "won"
        elif game.guess_number >= game.max_guesses:
            game.status = "lost"

        output = {
            "result": {"white": whites, "black": blacks},
            "turns": game.guess_number,
            "gameId": game_id,
            "status": game.status,
        }
        if game.status == "active":
            output["inputWord"] = input_word
        else:
            output.update({
                "secretWord": game.secret_word,
                "maxTurns": game.max_guesses,
                "allowRepeats": "1" if game.allow_repeats else "0",
                "numberOfColors": game.letter_count,
            })
        return output

    @app.route("/gameCount")
    def game_count():
        return str(len(games))

    @app.route("/")
    def index():
        return ('<p>The endpoints are "/createNewGame/slots/letter_count/allow_repeats/max_guesses", '
                '"/game/id/guess/input_word" and "/gameCount"</p>')

    return app
