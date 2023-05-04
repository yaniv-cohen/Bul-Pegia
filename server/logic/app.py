from flask import Flask
import game
import time
from flask_cors import CORS
from flask import request
app = Flask(__name__)
CORS(app)

wordLength=5
new_game = game.Game(wordLength)
new_game.current_guess = ''
print("started game in server,  id: "+ new_game.game_id )

@app.route("/game/<id>/guess/<input_word>")
def guess(id, input_word):
    print("id:"+id, "  Word:"+ input_word +
           "  secret: " +','.join(new_game.secret_word))
    new_game.current_guess = input_word
    new_game.guess_number+=1
    [blacks, whites] = new_game.getMarks(list(input_word.upper()) , new_game.secret_word)
    return (
        {
        "input_word": input_word,
        "secret_word": new_game.secret_word,
        "result": {"white" : whites, "black" : blacks},
        "game_id": new_game.game_id,
        "text" : (
        "<h1>Your result is: <div>BLACKS: " +str(blacks) +", WHITES: "+ str(whites) 
    +"</h1><ul><li>id:"+str(new_game.game_id)+"</li><li>secret_word:"+",".join(new_game.secret_word) +"</li></ul>")
    } )

@app.route('/scoreboard')
def scoreboard():
    return "<p>Scoreboard !</p>"
@app.route('/')
def hello_world():
    return "<p>Hello, World !</p>"
