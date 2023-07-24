import uuid
from flask import Flask
from game import *
from flask_cors import CORS
from flask import request
# from getNextPossibleResults import getNextPossibleResults
app = Flask(__name__)
CORS(app)

wordLength= 4
myGames = {} 
# fisrtGameId = "one"
# hi=game.Game(wordLength)
# myGames[hi.game_id] = hi
# base_game = myGames[hi.game_id]
# base_game.current_guess = ''
# print(myGames[hi.game_id].game_id)
# print("started game in server,  id: "+ base_game.game_id )

@app.route("/createNewGame/<slots>/<letter_Count>/<allow_repeats>/<MAX_GUESS>")
def createNewGame(slots, letter_Count, allow_repeats, MAX_GUESS):
    id = str(uuid.uuid4())[0:4]
    tries = 0
    while(id in myGames):
        tries+=1
        id = str(uuid.uuid4())[0:4 + tries]
    print('making new game : ' + id  + 
          " slots: "+ str(slots)+ 
          " letter_Count: "+ str(letter_Count)+ 
          " allow_repeats: "+ str(allow_repeats))
    myGames[id] = Game(id, int(slots), int(letter_Count), allow_repeats , int(MAX_GUESS))
    obj = myGames[id]
    for attr in dir(obj):
        # Getting rid of dunder methods
        if not attr.startswith("__"):
            print(attr, getattr(obj, attr))
    return (id)

@app.route("/game/<id>/guess/<input_word>")
def guess(id, input_word):
    target_game = myGames[str(id)]
    # print(target_game)
    print("id:"+id[:5], "  Word:"+ input_word +
           "  secret: " +','.join(target_game.secret_word) + str(target_game.guess_number) + "/"+str(target_game.MAX_GUESS))
    if(target_game.guess_number+1>target_game.MAX_GUESS ):
        print("lost, sorry")
        output={
            "secret_word": target_game.secret_word,
            "turns": target_game.guess_number,
            "game_id": id,
        }
        target_game.status = "lost"
    else:
        target_game.guess_number= target_game.guess_number + 1

        [blacks, whites] = getMarks(list(input_word.upper()) , target_game.secret_word)
        if(blacks== target_game.wordLength):
            target_game.status = "won"
            output={
                "secret_word": target_game.secret_word,
                "result": {"white" : whites, "black" : blacks},
                "secretWord": target_game.secret_word,
                  "maxTurns": target_game.MAX_GUESS,
                  "allowRepeats" : target_game.allowRepeats,
                   "numberOfColors": target_game.letter_Count,
                "turns": target_game.guess_number,
                "game_id": id,
                "status": "won"
            }
        elif(target_game.guess_number == target_game.MAX_GUESS):
            print("lost, sorry")
            output={
                "secret_word": target_game.secret_word,
                "result": {"white" : whites, "black" : blacks},
                "secretWord": target_game.secret_word,
                  "maxTurns": target_game.MAX_GUESS,
                  "allowRepeats" : target_game.allowRepeats,
                   "numberOfColors": target_game.letter_Count,
                "turns": target_game.guess_number,
                "game_id": id,
                "status": "lost"
            }
            target_game.status = "lost"
        else:
            output =  {
                "input_word": input_word,
                "result": {"white" : whites, "black" : blacks},
                "turns": target_game.guess_number,
                "game_id": id,
                "status": "active"
            } 
    # output= getOutputForGuess(target_game, input_word)
    print(output)
    return output

@app.route('/scoreboard')
def scoreboard():
    return "<p>Scoreboard !</p>"
@app.route('/')
def hello_world():
    return "<p>Hello, World !</p>"



