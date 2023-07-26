import uuid
from flask import Flask
from flask_cors import CORS
from game import Game
from get_marks_for_guess import get_marks
app = Flask(__name__)
CORS(app)

word_length= 4
myGames = {} 
@app.route("/createNewGame/<slots_count>/<letter_count>/<allow_repeats>/<max_guesses>")
def create_new_game(slots_count, letter_count, allow_repeats, max_guesses):
    new_game_id = str(uuid.uuid4())[0:4]
    tries = 0
    while(new_game_id in myGames):
        tries+=1
        new_game_id = str(uuid.uuid4())[0:4 + tries]
        
    print('making new game : ' + new_game_id  + 
          " slots_count: "+ str(slots_count)+ 
          " letter_count: "+ str(letter_count)+ 
          " allow_repeats: "+ str(allow_repeats))
    myGames[new_game_id] = Game(new_game_id, int(slots_count), int(letter_count), allow_repeats , int(max_guesses))
    obj = myGames[new_game_id]
    for attr in dir(obj):
        # Getting rid of dunder methods
        if not attr.startswith("__"):
            print(attr, getattr(obj, attr))
    return new_game_id

@app.route("/game/<id>/guess/<input_word>")
def guess(id, input_word):
    target_game = myGames[str(id)]
    # Calculate if the game is lost 
    if(target_game.guess_number+1>target_game.max_guesses ):
        output={
            "secretWord": target_game.secret_word,
            "turns": target_game.guess_number,
            "gameId": id,
        }
        target_game.status = "lost"
    else:
        target_game.guess_number= target_game.guess_number + 1

        [blacks, whites] = get_marks(list(input_word.upper()) , target_game.secret_word)
        if(blacks== target_game.word_length):
            target_game.status = "won"
            output= {
                "result": {"white" : whites, "black" : blacks},
                "secretWord": target_game.secret_word,
                  "maxTurns": target_game.max_guesses,
                  "allowRepeats" : target_game.allow_repeats,
                   "numberOfColors": target_game.letter_count,
                "turns": target_game.guess_number,
                "gameId": id,
                "status": "won"
            }
        elif(target_game.guess_number == target_game.max_guesses):
            print("lost, sorry")
            output={
                "result": {"white" : whites, "black" : blacks},
                "secretWord": target_game.secret_word,
                  "maxTurns": target_game.max_guesses,
                  "allowRepeats" : target_game.allow_repeats,
                   "numberOfColors": target_game.letter_count,
                "turns": target_game.guess_number,
                "gameId": id,
                "status": "lost"
            }
            target_game.status = "lost"
        else:
            output =  {
                "inputWord": input_word,
                "result": {"white" : whites, "black" : blacks},
                "turns": target_game.guess_number,
                "gameId": id,
                "status": "active"
            } 
    return output

@app.route('/gameCount')
def game_count():
    return str(len(myGames))
@app.route('/')
def hello_world():
    return '<p>The endpoints are "/createNewGame/slots/letter_count/allow_repeats/max_guesses", "/game/id/guess/input_word" "/gameCount"</p>'



