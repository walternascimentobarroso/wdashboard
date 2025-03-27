import { FC } from "react";
import Page from "./app/dashboard/page";
import { ThemeProvider } from "@/components/theme-provider";

const App: FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Page />
    </ThemeProvider>
  );
};

export default App;
