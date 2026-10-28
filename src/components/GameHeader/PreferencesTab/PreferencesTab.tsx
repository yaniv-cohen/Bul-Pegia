import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

export const PreferencesTab = ({
  toggleResetOnSubmit,
  resetOnSubmit,
}: {
  toggleResetOnSubmit: () => void;
  resetOnSubmit: boolean;
}) => {
  return (
    <FormControl display="flex" alignItems="center" gap={3}>
      <FormLabel htmlFor="reset-on-submit" mb={0}>
        {"מחק בחירה אחרי ניחוש"}
      </FormLabel>
      <Switch id="reset-on-submit" isChecked={resetOnSubmit} onChange={toggleResetOnSubmit} />
    </FormControl>
  );
};
