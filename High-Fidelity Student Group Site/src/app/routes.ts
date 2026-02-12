import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Payroll } from "./pages/Payroll";
import { GpaCalculator } from "./pages/GpaCalculator";
import { MemberProfiles } from "./pages/MemberProfiles";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "payroll", Component: Payroll },
      { path: "gpa-calculator", Component: GpaCalculator },
      { path: "member-profiles", Component: MemberProfiles },
    ],
  },
]);
