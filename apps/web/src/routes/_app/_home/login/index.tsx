import { createFileRoute, redirect } from "@tanstack/react-router";
import { user } from "api/user";
import Background from "assets/images/ui/menu/login/backgroundForm.svg";
import Logo from "assets/images/ui/menu/login/logoWithBottom.svg";
import { LoginForm } from "routes/_app/_home/login/login";
import styles from "./-components/login.module.css";

export const Route = createFileRoute("/_app/_home/login/")({
  component: RouteComponent,
  beforeLoad: async ({ context: { queryClient } }) => {
    const userData = await queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: user.details.GET,
    });

    if (userData.status === 200) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return (
    <div className={styles.container}>
      <img src={Background} alt="" className={styles.background} />
      <img src={Logo} alt="" className={styles.logo} />
      <LoginForm />
    </div>
  );
}
