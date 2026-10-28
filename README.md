# Bul Pgia

## Description

This is an api for creating and playing random games of the Israeli game of Bul Pgia or the game Mastermind.

[Link to an article about the game by the Davidson Institute](https://davidson.weizmann.ac.il/online/mathcircle/articles/%D7%91%D7%95%D7%9C-%D7%A4%D7%92%D7%99%D7%A2%D7%94#:~:text=%D7%A2%D7%9C%20%D7%9B%D7%9C%20%D7%A6%D7%91%D7%A2%20%D7%A0%D7%9B%D7%95%D7%9F%20%D7%A9%D7%A0%D7%9E%D7%A6%D7%90,%22%D7%A9%D7%AA%D7%99%20%D7%A4%D7%92%D7%99%D7%A2%D7%95%D7%AA%22%20%D7%95%D7%9B%D7%95)

## Base URL

The base URL for all API requests is:

`https://bul-pgia-back.onrender.com`

## Endpoints

### `GET /createNewGame/<slots=4>/<letter_Count=6>/<allow_repeats=1>/<MAX_GUESS=10>`

This request creates a game using the given parameters, and returns the new game's ID.
The default values are detailed using the equal("=") sign. Trailing parameters can be left out, e.g. `/createNewGame/5`.

### Parameters

- `slots` (optional): The number of color slots in the game.
- `letter_Count` (optional): The number of different colors allowed in the game.
- `allow_repeats` (optional): `1` to allow the same color more than once in the secret, `0` otherwise.
- `MAX_GUESS` (optional): The number of times the user is allowed to guess before losing.

### Response

Returns the ID of the created game as plain text.

### Example

Request:

```
https://bul-pgia-back.onrender.com/createNewGame/4/6/1/10
```

Server Actions:

```
A game is created with a random ID of length 4 or more.
A secret combination of characters is randomized using the given parameters and saved.

```

Response:

```
"cd51"

```

### `GET /game/<id>/guess/<input_word>`

This request contains the guess as a string of letters, for example "ABBA" (lowercase is accepted too).
Each letter corresponds to a different color in the front end.

### Parameters

- `id` : The ID of the game, as returned by `/createNewGame`.
- `input_word` : The guess made by the player, for example "CCBA". It must be exactly `slots` letters long and only use the game's letters.

### Example

Request:

```
https://bul-pgia-back.onrender.com/game/e581/guess/ABCD
```

#### Ongoing game:

```json
{
  "inputWord": "ABCD",
  "result": { "white": 1, "black": 2 },
  "turns": 1,
  "gameId": "e581",
  "status": "active"
}
```

#### Game won (`"status": "won"`) or lost on the last guess (`"status": "lost"`):

```json
{
  "result": { "white": 0, "black": 4 },
  "secretWord": ["A", "B", "C", "D"],
  "maxTurns": 10,
  "allowRepeats": "1",
  "numberOfColors": 6,
  "turns": 3,
  "gameId": "e581",
  "status": "won"
}
```

### `GET /gameCount`

This request returns the number of games currently on the server, including finished games.
Games are kept in memory, so the count resets when the server restarts.

## Errors

Errors are returned as JSON with an `error` message:

- `400 Bad Request`: invalid game settings (for example, no repeats with fewer colors than slots), or a guess with the wrong length or letters. An invalid guess does not use up a turn.
- `404 Not Found`: no game with that ID (it may have been lost when the server restarted).
- `409 Conflict`: the game is already over. The body also includes `status`, `secretWord`, `turns` and `gameId`.

![Bul Pgia](public/bulpgiaLogo.png)

```
This Api was created by the Yaniv Cohen squad.
```

For setup, running locally, tests and deployment, see [RUNBOOK.md](RUNBOOK.md).
