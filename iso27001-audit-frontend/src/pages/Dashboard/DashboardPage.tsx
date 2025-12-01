import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <section>
      <h2>Tableau de bord SMSI</h2>
      <p>
        Vue synthétique de l’état de préparation à l’audit ISO 27001 : couverture
        documentaire, exigences satisfaites, non-conformités majeures potentielles, etc.
      </p>
      {/* TODO : cartes KPI, graphiques, indicateurs de complétude */}
    </section>
  );
};

export default DashboardPage;
