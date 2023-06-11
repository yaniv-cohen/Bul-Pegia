from getMarksForGuess import getMarksForGuess

def me(A,B,blacks, whites):
    out=getMarksForGuess(A,B)
    assert out[0] == blacks
    assert out[1] == whites

def test_getMarksForGuess() -> None:
    me(["A", "B", "C", "D"], ["A", "B", "C", "D"] ,4 , 0)
    me(["A", "B", "C", "D"], ["A", "B", "C", "E"] ,3 , 0)
    me(["A", "B", "A", "B"], ["A", "B", "E", "E"] ,2 , 0)
    me(["A", "B", "A", "B"], ["A", "E", "E", "E"] ,1 , 0)
    me(["A", "B", "A", "B"], ["A", "E", "E", "E"] ,1 , 0)
    me(["A", "B", "C", "D"], ["B", "E", "E", "E"] ,0 , 1)
    me(["A", "B", "C", "D"], ["B", "C", "E", "E"] ,0 , 2)
    me(["A", "B", "C", "D"], ["B", "C", "D", "E"] ,0 , 3)
    me(["A", "B", "C", "D"], ["B", "C", "D", "E"] ,0 , 3)
    me(["A", "B", "C", "D"], ["B", "C", "D", "A"] ,0 , 4)
    me(["A", "A", "B", "B"], ["B", "B", "A", "A"] ,0 , 4)
    me(["A", "B", "B", "B"], ["B", "B", "A", "A"] ,1 , 2)
    me(["A", "B", "A", "B"], ["B", "A", "B", "A"] ,0 , 4)
    me(["B", "B", "A", "B"], ["A", "B", "B", "B"] ,2 , 2)
    me(["B", "A", "B", "C"], ["B", "C", "A", "B"] ,1 , 3)
    me(["B", "A", "B", "C"], ["B", "C", "A", "E"] ,1 , 2)
    me(["B", "A", "B", "C"], ["B", "C", "E", "E"] ,1 , 1)
    me(["B", "A", "B", "C"], ["B", "E", "E", "E"] ,1 , 0)