from manim import *


class SquareToCircle(Scene):
    def construct(self):
        circle = Circle()
        square = Square()
        triangle = Triangle()
        # pentagon = pentagon()
        self.play(Create(square))
        square.flip(RIGHT)
        square.rotate(-3 * TAU / 8)
        self.play(Transform(square, circle))
        circle.set_fill(PINK, opacity=0.5)

        self.play(Transform(circle, triangle))
        self.play(FadeOut(square))

# class SquareToCircle(Scene):
#     def construct(self):
#         circle = Circle()  # create a circle
#         circle.set_fill(PINK, opacity=0.5)  # set color and transparency

#         square = Square()  # create a square
#         square.rotate(PI / 4)  # rotate a certain amount

#         self.play(Create(square))  # animate the creation of the square
#         self.play(Transform(square, circle))  # interpolate the square into the circle
#         self.play(FadeOut(square))  # fade out animation