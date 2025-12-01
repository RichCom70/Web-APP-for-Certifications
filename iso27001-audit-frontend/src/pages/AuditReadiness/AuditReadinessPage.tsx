import React from "react";

const readinessItems = [
  {
    title: "Dossier d'audit",
    description: "Check-list des preuves attendues, responsables et dates de livraison.",
    status: "En cours",
  },
  {
    title: "Planification",
    description: "Créneaux proposés pour l'audit de certification et réunions préparatoires.",
    status: "À planifier",
  },
  {
    title: "Non-conformités potentielles",
    description: "Points sensibles identifiés durant la pré-audit interne.",
    status: "2 à suivre",
  },
];

const upcomingSessions = [
  { label: "Kick-off audit", date: "2025-02-03", owner: "Auditeur" },
  { label: "Revue des preuves", date: "2025-02-10", owner: "RSSI" },
  { label: "Tests techniques", date: "2025-02-17", owner: "SecOps" },
];

export const AuditReadinessPage: React.FC = () => {
  return (
    <section>
      <h2>Préparation de l’audit</h2>
      <p>
        Suivi des actions critiques avant l’audit ISO 27001 : constitution des preuves, réunions
        avec les auditeurs et résolution des non-conformités potentielles.
      </p>

      <div className="card">
        <h3>État des chantiers</h3>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {readinessItems.map((item) => (
            <div
              key={item.title}
              style={{
                background: "var(--bg-card)",
                padding: "1rem",
                borderRadius: "0.75rem",
                border: "1px solid #e5e7eb",
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: "0.35rem" }}>{item.title}</div>
              <div style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>{item.description}</div>
              <div style={{ fontSize: "0.9rem", color: "#2563eb" }}>{item.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: "1.5rem" }}>
        <h3>Sessions à venir</h3>
        <table>
          <thead>
            <tr>
              <th>Session</th>
              <th>Date cible</th>
              <th>Responsable</th>
            </tr>
          </thead>
          <tbody>
            {upcomingSessions.map((session) => (
              <tr key={session.label}>
                <td>{session.label}</td>
                <td>{session.date}</td>
                <td>{session.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AuditReadinessPage;
