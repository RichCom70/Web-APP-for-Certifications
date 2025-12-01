import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo">ISO 27001</span>
        <span className="sidebar-subtitle">Audit readiness</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          Tableau de bord
        </NavLink>
        <NavLink to="/documents" className="sidebar-link">
          Corpus documentaire
        </NavLink>
        <NavLink to="/requirements" className="sidebar-link">
          Matrice exigences
        </NavLink>
        <NavLink to="/gap-analysis" className="sidebar-link">
          Gap analysis
        </NavLink>
        <NavLink to="/audit-readiness" className="sidebar-link">
          Préparation audit
        </NavLink>
        <NavLink to="/settings" className="sidebar-link">
          Paramètres
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
