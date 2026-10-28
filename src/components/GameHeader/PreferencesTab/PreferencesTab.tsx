import { Card } from "@chakra-ui/react";
import { Option } from "../../StartGame/Options/Option";
import { FlexColumn } from "../../utils/FlexColumn";
import { SwitchRect } from "../../utils/Switch";

export const PreferencesTab = ({
  toggleResetOnSubmit,
  resetOnSubmit,
}: {
  toggleResetOnSubmit: () => void;
  resetOnSubmit: boolean;
}) => {
  return (
    <Card>
      <FlexColumn>
        <Option text="מחק בחירה אחרי ניחוש:" currentValue={resetOnSubmit ? "כן" : "לא"}>
          <SwitchRect value={resetOnSubmit} toggleFunction={toggleResetOnSubmit} />
        </Option>
      </FlexColumn>
    </Card>
  );
};
