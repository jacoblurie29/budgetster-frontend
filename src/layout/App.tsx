import "./App.css";
import Sidebar from "./sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const App = () => (
  <div className="app-main-container">
    <div className="app-main-sidebar">
      <Sidebar />
    </div>
    <div className="app-main-content">
      <Outlet />
    </div>
  </div>
);

export default App;
