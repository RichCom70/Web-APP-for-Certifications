import React from "react";
import RequirementsMatrix from "../../components/requirements/RequirementsMatrix";

const RequirementsMatrixPage: React.FC = () => {
  return (
    <section>
      <h2>Matrice des exigences ISO 27001</h2>
      <p>
        Affiche la liste des clauses et contrôles ISO 27001:2022 et leur couverture
        par le corpus documentaire.
      </p>
      <RequirementsMatrix />
    </section>
  );
};

export default RequirementsMatrixPage;
