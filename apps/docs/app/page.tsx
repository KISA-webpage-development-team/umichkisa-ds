import { DS_VERSION } from "@umichkisa-ds/web";
import "@umichkisa-ds/web/dist/styles.css";

export default function HomePage() {
  return (
    <main>
      <h1>KISA Design System</h1>
      <p>Version: {DS_VERSION}</p>
      {/* TODO: Design landing page */}
    </main>
  );
}
