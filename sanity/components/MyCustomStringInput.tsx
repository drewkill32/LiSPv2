import { TextInput } from "@sanity/ui";
import type { StringInputProps } from "sanity";

export const MyCustomStringInput = (props: StringInputProps) => {
  console.log(props);
  return <TextInput {...props.elementProps} />;
};
