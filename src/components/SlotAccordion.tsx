import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Card,
} from "@chakra-ui/react";
export const SlotAccordion = ({
  slot,
  index,
  setChosenOption,
  chosen,
  ColorList,
}: {
  slot: string[];
  index: number;
  setChosenOption: Function;
  chosen: string | null;
  ColorList: string[];
}) => {

  const colorMap = {} as any;
  slot.forEach((letter, i) => (colorMap[letter] = ColorList[i])); //this transforms letters to colors
  
  return (
    <Accordion allowMultiple={true} id={"accordion-" + index}>
      <AccordionItem>
        <h2>
          <AccordionButton className={chosen + " marked strongSext"}>
            <Box as="span" flex="1" textAlign="left">
              {chosen?? "?"}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        {slot.map((option: typeof colorMap, slotIndex: number) => {
          const marked = colorMap[option] === chosen;
          return (
            <Card key={colorMap[option]+slotIndex} width={"120px"}>
              <AccordionPanel
                className={
                  marked
                    ? "color-button marked " + colorMap[option]
                    : `color-button notMarked ${colorMap[option]} ${
                        chosen ? "hide" : null
                      }` + colorMap[option]
                }
                pb={4}
              >
                <Button
                  onClick={() => {
                    setChosenOption(index - 1, colorMap[option]);
                  }}
                >
                  {colorMap[option]}
                </Button>
              </AccordionPanel>
            </Card>
          );
        })}
      </AccordionItem>
    </Accordion>
  );
};
export default SlotAccordion;
