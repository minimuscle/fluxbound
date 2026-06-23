import { Button, Input, PasswordInput } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { Form } from "utils/form/form";
import { useAppForm } from "utils/form/useForm";
import { z } from "zod";
import { user } from "../../../api/user";
import "./login.scss";

/**********************************************************************************************************
 *   CONSTS
 **********************************************************************************************************/
const Route = getRouteApi("/_app/_home/login/");

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const LoginForm = () => {
  /***** HOOKS *****/
  const queryClient = useQueryClient();
  const navigate = Route.useNavigate();

  /***** QUERIES *****/
  const { mutateAsync } = useMutation({
    mutationFn: (params: { email: string; password: string }) => {
      return user.login.POST(params);
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
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate({ to: "/" });
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

        <Button type="submit" w={"100%"}>
          Login
        </Button>
      </Form>
    </div>
  );
};
