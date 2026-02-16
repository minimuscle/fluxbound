import { Input } from "@mantine/core";
import { useFieldContext } from "../../utils/form/useForm";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const InternalTackstackInput = () => {
  /***** HOOKS *****/
  const {} = useFieldContext();
  /***** RENDER *****/
  return <Input />;
};
