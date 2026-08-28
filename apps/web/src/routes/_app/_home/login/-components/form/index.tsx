import { noop } from "@mantine/core";
import { EnvelopeIcon, LockKeyIcon } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { user } from "api/user";
import Or from "assets/images/ui/menu/login/or.svg";
import { audioManager } from "utils/audio";
import { Form } from "utils/form/form";
import { useAppForm } from "utils/form/useForm";
import { z } from "zod";
import styles from "./login.module.css";

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

  console.log("login url: ", import.meta.env.VITE_BASE_URL);

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      <Form form={form} className={styles.form}>
        <form.AppField
          name="email"
          children={(field) => (
            <div className={styles.inputContainer}>
              <EnvelopeIcon
                size={28}
                color="#d5b864"
                className={styles.inputIcon}
              />
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Email"
                className={styles.input}
              />
            </div>
          )}
        />
        <form.AppField
          name="password"
          children={(field) => (
            <div className={styles.inputContainer}>
              <LockKeyIcon
                weight="fill"
                size={28}
                color="#d5b864"
                className={styles.inputIcon}
              />
              <input
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Password"
                className={styles.input}
              />
            </div>
          )}
        />
        <p className={styles.text}>Forgot Password?</p>

        <button
          type="submit"
          className={styles.button}
          onMouseEnter={() => audioManager.playSoundEffect("buttonHover")}
        >
          Log In
        </button>
      </Form>

      <img src={Or} alt="" className={styles.or} />
      <button
        type="button"
        onClick={noop}
        className={styles.buttonSecondary}
        onMouseEnter={() => audioManager.playSoundEffect("buttonHover")}
      >
        Create Account
      </button>
    </div>
  );
};
