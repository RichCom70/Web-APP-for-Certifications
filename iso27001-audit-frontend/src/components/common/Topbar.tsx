import React from "react";
import "./Topbar.css";

const Topbar: React.FC = () => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">ISO 27001 – Préparation audit</h1>
      </div>
      <div className="topbar-right">
        <span className="topbar-env">Environnement : Démo</span>
        {/* plus tard : sélection d’organisation, utilisateur, langue, etc. */}
      </div>
    </header>
  );
};

export default Topbar;
