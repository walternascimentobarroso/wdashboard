import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "@/app/dashboard/home";
import About from "@/app/dashboard/about";
import Layout from "@/app/dashboard/layout";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
