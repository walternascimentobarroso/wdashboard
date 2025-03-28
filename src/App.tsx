import { FC } from "react";
import { AppRoutes } from './routes'

import { ThemeProvider } from "@/components/theme-provider";

const App: FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
