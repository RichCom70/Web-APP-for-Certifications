import type { DocumentMetadata } from "../types/documents";

export const mockDocuments: DocumentMetadata[] = [
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
  {
    id: "DOC-003",
    title: "Charte informatique",
    isoReferences: ["7.2", "A.6.2"],
    status: "en revue",
    lastReviewDate: "2025-02-20",
    owner: "DSI",
  },
  {
    id: "DOC-004",
    title: "Procédure de sauvegarde",
    isoReferences: ["A.8.13", "A.8.14"],
    status: "validé",
    lastReviewDate: "2025-02-01",
    owner: "Ops",
  },
  {
    id: "DOC-005",
    title: "Plan de reprise d’activité",
    isoReferences: ["A.5.29", "A.8.16"],
    status: "en revue",
    lastReviewDate: "2025-01-28",
    owner: "Continuité",
  },
  {
    id: "DOC-006",
    title: "Politique de sauvegarde des données",
    isoReferences: ["A.8.13"],
    status: "brouillon",
    lastReviewDate: "2025-03-05",
    owner: "DSI",
  },
];
