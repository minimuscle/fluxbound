import { Input, PasswordInput } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form } from "utils/form/form";
import { useAppForm } from "utils/form/useForm";
import { z } from "zod";
import { user } from "../../../api/user";
import "./login.scss";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const LoginForm = () => {
  /***** HOOKS *****/
  const queryClient = useQueryClient();

  /***** QUERIES *****/
  const { mutateAsync } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return user.login.POST({ email, password });
    },
  });

  /***** FORM *****/
  const form = useAppForm({
    validators: {
      onSubmit: z.object({
        email: z.email("Email is required"),
        password: z.string().min(1, "Password is required"),
      }),
    },
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      mutateAsync(value);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  /***** RENDER *****/
  return (
    <div className="LoginForm">
      <Form form={form}>
        <form.AppField
          name="email"
          children={(field) => <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="Email" />}
        />
        <form.AppField
          name="password"
          children={(field) => <PasswordInput value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="Password" />}
        />
        <button type="submit">Login</button>
      </Form>
    </div>
  );
};
