export type DocumentStatus = "brouillon" | "en revue" | "validé" | "obsolète";

export interface DocumentMetadata {
  id: string;
  title: string;
  isoReferences: string[]; // ex : ["5.2", "A.5.1"]
  status: DocumentStatus;
  lastReviewDate: string;  // ISO date yyyy-mm-dd
  owner: string;           // ex : "RSSI", "DSI"
}
