# API Template

## Description

This is an api for creating and playing random games of the Israeli game of Bul Pgia.

[Link to an article about the game by the Davidson Institute](https://davidson.weizmann.ac.il/online/mathcircle/articles/%D7%91%D7%95%D7%9C-%D7%A4%D7%92%D7%99%D7%A2%D7%94#:~:text=%D7%A2%D7%9C%20%D7%9B%D7%9C%20%D7%A6%D7%91%D7%A2%20%D7%A0%D7%9B%D7%95%D7%9F%20%D7%A9%D7%A0%D7%9E%D7%A6%D7%90,%22%D7%A9%D7%AA%D7%99%20%D7%A4%D7%92%D7%99%D7%A2%D7%95%D7%AA%22%20%D7%95%D7%9B%D7%95)

## Base URL

The base URL for all API requests is:

`https://bul-pgia-back.onrender.com`

## Endpoints

### `GET /createNewGame/<slots=4>/<letter_Count=6>/<allow_repeats=1>/<MAX_GUESS=10>`

This request creates a game using the given parameters, and returns the new game's ID.
The default values are detailed using the equal("=") sign.

### Parameters

- `slots` (optional): The number of color slots in the game.
- `letter_Count` (optional): The number of diffrent colors allowed in the game.
- `allow_repeats` (optional): Whether to allow the repetition of colors when choosing colors.
- `MAX_GUESS` (optional): The number of times the user is allowed to guess before losing.

### Response

Returns the ID of the created Game.

Returns a JSON object with the following properties:

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

This request contains the guess as a string of upperCase letters, for example "ABBA".
Each letters corresponds to a diffrent color in the front end.

### Parameters

- `id` : The ID of color slots in the game.
- `input_word` : The guess made by the player as uppercase letters, for example "CCBA".

### Response

Returns the calculated response for the given guessed combination.
Returns a JSON object with the following properties:

### Example

Request:

```
https://bul-pgia-back.onrender.com/game/e581/guess/ABCD
```

Server Actions:

```
A game is created with a random ID of length 4 or more.
A secret combination of characters is randomized using the given parameters and saved.

```

Response:

#### Ongoing game message:

```
A JSON object with the following properties:
{
                "input_word": input_word,
                "result": {
                    "white" : whites,
                    "black" : blacks},
                "turns": guess_number,
                "game_id": id,
                "status": "active"
            }

```

#### Winning message:

```
A JSON object with the following properties:
{
                "secret_word": secret_word,
                "result": {
                    "white" : whites,
                    "black" : blacks},
                "secretWord": secret_word,
                "maxTurns": MAX_GUESS,
                "allowRepeats" : allowRepeats,
                "numberOfColors": letter_Count,
                "turns": guess_number,
                "game_id": id,
                "status": "won"
            }

```

#### Losing message:

```
A JSON object with the following properties:
{
                "secret_word": secret_word,
                "result": {
                    "white" : whites,
                    "black" : blacks},
                "secretWord": secret_word,
                "maxTurns": MAX_GUESS,
                "allowRepeats" : allowRepeats,
                "numberOfColors": letter_Count,
                "turns": guess_number,
                "game_id": id,
                "status": "lost"
            }

```

#### Losing after the game was finished:

```
A JSON object with the following properties:
{
            "secret_word": secret_word,
            "turns": guess_number,
            "game_id": id
        }

```

### `GET /gameCount`

This request returns the number of games currently on the server, including finished games.

## Errors

Sadly, this API currently does not support error messages:

![Bul Pgia](public/bulpgiaLogo.png)
```
This Api was created by the Yaniv Cohen squad.
```
<!-- - `400 Bad Request`: The request was malformed or missing required parameters.
- `401 Unauthorized`: The API key provided was invalid or missing.
- `404 Not Found`: The requested resource was not found.
- `500 Internal Server Error`: An unexpected error occurred on the server. -->
<!--
 -->
