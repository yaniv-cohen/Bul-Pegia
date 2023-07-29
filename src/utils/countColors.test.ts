import { countColors } from "./countColors";

test(
  "count",()=>{
    expect(countColors(["A", "B", "C", "d"])).toEqual(4);
    expect(countColors(["A", "B", "B", "d"])).toEqual(3);
    expect(countColors(["A", "B", "B", "B"])).toEqual(2);
    expect(countColors(["A", "B", "B", "d"])).toEqual(3);
    expect(countColors(["B", "B", "B", "B"])).toEqual(1);
})