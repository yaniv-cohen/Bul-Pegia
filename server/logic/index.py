import arcade
import arcade.gui
# Set constants for the screen size
SCREEN_WIDTH = 600
SCREEN_HEIGHT = 600

# Open the window. Set the window title and dimensions (width and height)
arcade.open_window(SCREEN_WIDTH, SCREEN_HEIGHT, "Drawing Example")

# Set the background color to white.
# For a list of named colors see:
# http://arcade.academy/arcade.color.html
# Colors can also be specified in (red, green, blue) format and
# (red, green, blue, alpha) format.
arcade.set_background_color(arcade.color.WHITE)

# Start the render process. This must be done before any drawing commands.
arcade.start_render()









# Importing arcade module
import arcade
# Importing arcade gui
import arcade.gui
  
# Creating MainGame class
class MainGame(arcade.Window):
    def __init__(self):
        super().__init__(600, 600, title="Buttons")
  
        # Changing background color of screen
        arcade.set_background_color(arcade.color.BLUE)
  
        # Creating a UI MANAGER to handle the UI
        self.uimanager = arcade.gui.UIManager()
        self.uimanager.enable()
  
        # Creating Button using UIFlatButton
        start_button = arcade.gui.UIFlatButton(text="Start Game",
                                               width=200)
  
        # Assigning our on_buttonclick() function
        start_button.on_click = self.on_buttonclick
  
        # Adding button in our uimanager
        self.uimanager.add(
            arcade.gui.UIAnchorWidget(
                anchor_x="center_x",
                anchor_y="center_y",
                child=start_button)
        )
  
    
    playerInputs =[]
    for i in range(4):
        playerInput = {}
        playerInput["location"] = [50+120*i, 50]
        playerInput["options"] = ["A","B","C","D"]
        playerInputs.append(playerInput )
    # Draw the face
    x = 300
    y = 300 
    radius = 50
    arcade.draw_circle_filled(x, y, radius, arcade.color.YELLOW)
    for i in range(len(playerInputs)):
        print(i)
        arcade.draw_circle_filled(playerInputs[i]['location'][0], playerInputs[i]['location'][1], radius, arcade.color.YELLOW)


    # This function will be called everytime the user
    # presses the start button
    def on_buttonclick(self, event):
        print("Button is clicked")
  
    # Creating on_draw() function to draw on the screen
    def on_draw(self):
        arcade.start_render()
          
        # Drawing our ui manager
        self.uimanager.draw()
  
  
# Calling MainGame class
MainGame()
arcade.run()