import React from "react";
import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";

import "./MainLayout.css"; // si tu veux un CSS séparé, sinon fusionne avec index.css

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;

