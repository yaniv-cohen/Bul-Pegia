from flask import Flask
import game
import time
from flask_cors import CORS
from flask import request
app = Flask(__name__)
CORS(app)

new_game = game.Game()
new_game.current_guess = ''
print("started game in server,  id: "+ new_game.game_id )

@app.route("/game/<id>/guess/<input_word>")
def guess(id, input_word):
    result =game.getNumbers(input_word)
    print("id:"+id, "  Word:"+ input_word +
           "  secret: " +','.join(new_game.secret_word))
    new_game.current_guess = input_word
    new_game.guess_number+=1
    [blacks, whites] = new_game.getMarks(list(input_word.upper()) , new_game.secret_word)
    return (
        {
        "input_word": input_word,
        "secret_word": new_game.secret_word,
        "result": {"white" : str(whites), "black" : str(blacks)},
        "game_id": new_game.game_id,
        "text" : (
        "<h1>Your result is: <div>BLACKS: " +str(blacks) +", WHITES: "+ str(whites) 
    +"</h1><ul><li>id:"+str(new_game.game_id)+"</li><li>secret_word:"+",".join(new_game.secret_word) +"</li></ul>")
    } )

@app.route('/')
def hello_world():
    return "<p>Hello, World !</p>"
# def startLoop():
#     while True:
#         print (new_game.secret_word)
#         time.sleep(3)
# startLoop()
