import { createFileRoute } from "@tanstack/react-router";
import styles from "./-components/setup.module.css";

export const Route = createFileRoute("/_app/setup/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={styles.container}>
      <h1>Select A Domain</h1>
      <button>Fire</button>
      <button>Earth</button>
      <button>Water</button>
      <button>Air</button>
      <button>Life</button>
      <button>Death</button>
      <button>Light</button>
      <button>Dark</button>
      <button>Aether</button>
      <button>Void</button>
    </div>
  );
}
