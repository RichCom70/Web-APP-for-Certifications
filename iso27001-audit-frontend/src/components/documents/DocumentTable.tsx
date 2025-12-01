import React from "react";
import type { DocumentMetadata } from "../../types/documents";

const mockDocuments: DocumentMetadata[] = [
  {
    id: "DOC-001",
    title: "Politique de sécurité de l’information",
    isoReferences: ["5.2", "5.3", "A.5"],
    status: "validé",
    lastReviewDate: "2025-01-15",
    owner: "RSSI",
  },
  {
    id: "DOC-002",
    title: "Analyse de risques",
    isoReferences: ["6.1.2", "6.1.3"],
    status: "brouillon",
    lastReviewDate: "2025-03-10",
    owner: "Risk Manager",
  },
];

const DocumentTable: React.FC = () => {
  return (
    <table className="doc-table">
      <thead>
        <tr>
          <th>Réf.</th>
          <th>Titre</th>
          <th>Réf. ISO 27001</th>
          <th>Statut</th>
          <th>Dernière revue</th>
          <th>Propriétaire</th>
        </tr>
      </thead>
      <tbody>
        {mockDocuments.map((doc) => (
          <tr key={doc.id}>
            <td>{doc.id}</td>
            <td>{doc.title}</td>
            <td>{doc.isoReferences.join(", ")}</td>
            <td>{doc.status}</td>
            <td>{doc.lastReviewDate}</td>
            <td>{doc.owner}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DocumentTable;
