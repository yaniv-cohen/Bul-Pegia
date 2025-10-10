      export const ColoredCirclesFromArray = ({ colorsCount, colorList }: { colorsCount: number,
        colorList: string[]
       })=><div className="colors-container">
      {Array.from({ length: colorsCount }).map((_, index) =>  {
        const color = colorList[index];
        return (
    <span
              key={ index}
      
              className={
                "color-result " + color
                // COLOR_LIST[LETTER_OPTIONS.indexOf(char)]
              }
            >
            </span>
  ) })}
      </div>;