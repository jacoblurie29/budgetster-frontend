import "./App.css";
import DashboardSideBar from "../components/DashboardSideBar/DashboardSideBar";
import type { PropsWithChildren } from "react";

const App = ({ children }: PropsWithChildren) => (
  <div className="app-main-container">
    <div className="app-main-sidebar">
      <DashboardSideBar />
    </div>
    <div className="app-main-content">{children}</div>
  </div>
);

export default App;
