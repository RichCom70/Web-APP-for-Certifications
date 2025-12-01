import React from "react";
import DocumentTable from "../../components/documents/DocumentTable";

const DocumentsPage: React.FC = () => {
  return (
    <section>
      <h2>Corpus documentaire</h2>
      <p>
        Liste des documents du SMSI, leur statut, leur version et le lien avec les
        exigences ISO 27001.
      </p>
      <DocumentTable />
    </section>
  );
};

export default DocumentsPage;
