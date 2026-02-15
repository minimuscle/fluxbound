import { Input, PasswordInput } from "@mantine/core";
import { Form } from "utils/form/form";
import { useAppForm } from "utils/form/useForm";
import "./login.scss";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const LoginForm = () => {
  /***** QUERIES *****/
  // const { mutate } = useMutation({
  //   mutationFn: (data) => {
  //     return fetch("http://localhost:3000/login", {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //     });
  //   },
  // });

  /***** FORM *****/
  const form = useAppForm({
    onSubmit: ({ value }) => {
      console.log("Submitted", value);
    },
  });

  /***** RENDER *****/
  return (
    <div className="LoginForm">
      <Form form={form}>
        <Input placeholder="email" />
        <PasswordInput placeholder="password" />
        <button type="submit">Login</button>
      </Form>
    </div>
  );
};
