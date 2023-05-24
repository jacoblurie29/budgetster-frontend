import Dashboard from "../pages/dashboard/Dashboard";
import "./App.css";
import Sidebar from "./sidebar/Sidebar";

const App = () => {
  return (
    <div className="app-main-container">
      <div className="app-main-sidebar">
        <Sidebar />
      </div>
      <div className="app-main-content">
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
