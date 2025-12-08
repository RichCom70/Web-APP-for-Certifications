import React, { useMemo, useState } from "react";
import type { IsoRequirement } from "../../types/iso27001";
import { mockDocuments } from "../../data/mockDocuments";

import "./RequirementsMatrix.css";

type CoverageStatus = "non couvert" | "partiellement couvert" | "couvert";

interface RequirementCoverage {
  requirement: IsoRequirement;
  documents: string[];
  status: CoverageStatus;
  progress: number; // %
}

type RequirementSeed = IsoRequirement;

const clauseRequirements: RequirementSeed[] = [
  { id: "4.1", title: "Compréhension de l’organisation", description: "Contexte interne/externe", category: "clause" },
  { id: "4.2", title: "Parties intéressées et besoins", description: "Attentes en matière de sécurité", category: "clause" },
  { id: "4.3", title: "Périmètre du SMSI", description: "Définir et documenter le périmètre", category: "clause" },
  { id: "4.4", title: "SMSI et amélioration continue", description: "Mettre en œuvre, maintenir, améliorer", category: "clause" },
  { id: "5.1", title: "Leadership et engagement", description: "Implication de la direction", category: "clause" },
  { id: "5.2", title: "Politique de sécurité de l’information", description: "Politique approuvée et communiquée", category: "clause" },
  { id: "5.3", title: "Rôles, responsabilités et autorités", description: "Attribution claire des rôles", category: "clause" },
  { id: "6.1.1", title: "Actions face aux risques et opportunités", description: "Approche globale risque/opportunité", category: "clause" },
  { id: "6.1.2", title: "Appréciation des risques SI", description: "Méthode d’analyse des risques", category: "clause" },
  { id: "6.1.3", title: "Traitement des risques SI", description: "Plan de traitement des risques", category: "clause" },
  { id: "6.2", title: "Objectifs de sécurité de l’information", description: "Objectifs mesurables et suivis", category: "clause" },
  { id: "7.1", title: "Ressources", description: "Ressources nécessaires au SMSI", category: "clause" },
  { id: "7.2", title: "Compétences", description: "Compétences et formations", category: "clause" },
  { id: "7.3", title: "Sensibilisation", description: "Sensibilisation et culture sécurité", category: "clause" },
  { id: "7.4", title: "Communication", description: "Plan de communication interne/externe", category: "clause" },
  { id: "7.5", title: "Information documentée", description: "Création, maîtrise, conservation", category: "clause" },
  { id: "8.1", title: "Planification et contrôle opérationnels", description: "Pilotage des opérations", category: "clause" },
  { id: "8.2", title: "Appréciation des risques opérationnels", description: "Évaluation des risques changeants", category: "clause" },
  { id: "8.3", title: "Traitement des risques opérationnels", description: "Mise en œuvre des plans", category: "clause" },
  { id: "9.1", title: "Surveillance, mesure, analyse, évaluation", description: "Indicateurs et mesures", category: "clause" },
  { id: "9.2", title: "Audit interne", description: "Programme et exécution d’audits", category: "clause" },
  { id: "9.3", title: "Revue de direction", description: "Revue périodique du SMSI", category: "clause" },
  { id: "10.1", title: "Non-conformité et actions correctives", description: "Traitement des NC", category: "clause" },
  { id: "10.2", title: "Amélioration continue", description: "Améliorer en continu le SMSI", category: "clause" },
];

const annexARequirements: RequirementSeed[] = [
  // A.5 Organisation (37)
  { id: "A.5.1", title: "Politiques de sécurité de l’information", description: "Politiques approuvées, revues", category: "annexeA" },
  { id: "A.5.2", title: "Rôles et responsabilités", description: "Attribution et communication", category: "annexeA" },
  { id: "A.5.3", title: "Séparation des tâches", description: "Limiter les abus et erreurs", category: "annexeA" },
  { id: "A.5.4", title: "Responsabilité de la direction", description: "Soutien et supervision", category: "annexeA" },
  { id: "A.5.5", title: "Contacts avec les autorités", description: "Relations avec autorités", category: "annexeA" },
  { id: "A.5.6", title: "Contacts groupes spécialisés", description: "CERT, communautés", category: "annexeA" },
  { id: "A.5.7", title: "Veille sur les menaces", description: "Threat intelligence", category: "annexeA" },
  { id: "A.5.8", title: "Sécurité dans les projets", description: "Intégrer sécurité projet", category: "annexeA" },
  { id: "A.5.9", title: "Inventaire des informations et actifs", description: "Inventaires à jour", category: "annexeA" },
  { id: "A.5.10", title: "Usage acceptable des actifs", description: "Règles d’usage", category: "annexeA" },
  { id: "A.5.11", title: "Restitution des actifs", description: "Restitution en sortie", category: "annexeA" },
  { id: "A.5.12", title: "Classification de l’information", description: "Niveaux de classification", category: "annexeA" },
  { id: "A.5.13", title: "Étiquetage de l’information", description: "Labeling cohérent", category: "annexeA" },
  { id: "A.5.14", title: "Transfert de l’information", description: "Transferts protégés", category: "annexeA" },
  { id: "A.5.15", title: "Contrôle d’accès", description: "Principes d’accès", category: "annexeA" },
  { id: "A.5.16", title: "Gestion des identités", description: "Cycle de vie identités", category: "annexeA" },
  { id: "A.5.17", title: "Informations d’authentification", description: "Protection des secrets", category: "annexeA" },
  { id: "A.5.18", title: "Droits d’accès", description: "Provisioning / revocation", category: "annexeA" },
  { id: "A.5.19", title: "Relation fournisseurs", description: "Sécurité fournisseurs", category: "annexeA" },
  { id: "A.5.20", title: "Contrats fournisseurs", description: "Clauses et exigences", category: "annexeA" },
  { id: "A.5.21", title: "Chaîne d’approvisionnement ICT", description: "Sécurité supply chain", category: "annexeA" },
  { id: "A.5.22", title: "Suivi des services fournisseurs", description: "Revue & changement", category: "annexeA" },
  { id: "A.5.23", title: "Services cloud", description: "Sécurité des services cloud", category: "annexeA" },
  { id: "A.5.24", title: "Préparation gestion incidents", description: "Planification incidents", category: "annexeA" },
  { id: "A.5.25", title: "Évaluation des événements SI", description: "Triage des événements", category: "annexeA" },
  { id: "A.5.26", title: "Réponse aux incidents SI", description: "Traitement des incidents", category: "annexeA" },
  { id: "A.5.27", title: "Retour d’expérience incidents", description: "Leçons apprises", category: "annexeA" },
  { id: "A.5.28", title: "Collecte des preuves", description: "Chaîne de preuve", category: "annexeA" },
  { id: "A.5.29", title: "Sécurité en situation de perturbation", description: "Continuité des opérations", category: "annexeA" },
  { id: "A.5.30", title: "Préparation TIC pour continuité", description: "ICT readiness", category: "annexeA" },
  { id: "A.5.31", title: "Contraintes légales et contractuelles", description: "Conformité réglementaire", category: "annexeA" },
  { id: "A.5.32", title: "Droits de propriété intellectuelle", description: "Respect des licences", category: "annexeA" },
  { id: "A.5.33", title: "Protection des enregistrements", description: "Intégrité des archives", category: "annexeA" },
  { id: "A.5.34", title: "Vie privée et PII", description: "Protection des données perso", category: "annexeA" },
  { id: "A.5.35", title: "Revue indépendante du SMSI", description: "Audit indépendant", category: "annexeA" },
  { id: "A.5.36", title: "Conformité aux politiques", description: "Contrôles de conformité", category: "annexeA" },
  { id: "A.5.37", title: "Procédures documentées", description: "Procédures opérationnelles", category: "annexeA" },
  // A.6 Personnes (8)
  { id: "A.6.1", title: "Vérification des antécédents", description: "Avant embauche", category: "annexeA" },
  { id: "A.6.2", title: "Conditions d’emploi", description: "Engagements sécurité", category: "annexeA" },
  { id: "A.6.3", title: "Responsabilités après emploi", description: "Continuité des obligations", category: "annexeA" },
  { id: "A.6.4", title: "Sensibilisation, éducation, formation", description: "Programmes réguliers", category: "annexeA" },
  { id: "A.6.5", title: "Discipline", description: "Mesures disciplinaires sécurité", category: "annexeA" },
  { id: "A.6.6", title: "Responsabilités liées à la protection des infos", description: "Engagements individuels", category: "annexeA" },
  { id: "A.6.7", title: "Télétravail", description: "Sécurité en télétravail", category: "annexeA" },
  { id: "A.6.8", title: "Utilisation des appareils personnels", description: "BYOD et règles associées", category: "annexeA" },
  // A.7 Physique (14)
  { id: "A.7.1", title: "Périmètres de sécurité physique", description: "Défense en profondeur", category: "annexeA" },
  { id: "A.7.2", title: "Contrôle d’accès physique", description: "Entrées, sorties, badges", category: "annexeA" },
  { id: "A.7.3", title: "Sécurisation des locaux", description: "Bureaux, salles, sites", category: "annexeA" },
  { id: "A.7.4", title: "Surveillance physique", description: "CCTV, détection", category: "annexeA" },
  { id: "A.7.5", title: "Menaces physiques/environnementales", description: "Incendie, inondation", category: "annexeA" },
  { id: "A.7.6", title: "Zones à accès sécurisé", description: "Salles sensibles", category: "annexeA" },
  { id: "A.7.7", title: "Bureau propre / écran propre", description: "Clean desk & clean screen", category: "annexeA" },
  { id: "A.7.8", title: "Emplacement des équipements", description: "Protection physique", category: "annexeA" },
  { id: "A.7.9", title: "Actifs hors site", description: "Sécurité off-premises", category: "annexeA" },
  { id: "A.7.10", title: "Supports de stockage", description: "Protection et suivi", category: "annexeA" },
  { id: "A.7.11", title: "Services utilitaires", description: "Alimentation, climatisation", category: "annexeA" },
  { id: "A.7.12", title: "Sécurité du câblage", description: "Câbles protégés", category: "annexeA" },
  { id: "A.7.13", title: "Maintenance des équipements", description: "Maintenance contrôlée", category: "annexeA" },
  { id: "A.7.14", title: "Réemploi ou mise au rebut", description: "Effacement / destruction", category: "annexeA" },
  // A.8 Technologique (34)
  { id: "A.8.1", title: "Terminaux utilisateurs", description: "Protection des endpoints", category: "annexeA" },
  { id: "A.8.2", title: "Droits d’accès privilégiés", description: "Gestion des privilèges", category: "annexeA" },
  { id: "A.8.3", title: "Restriction d’accès à l’information", description: "Need-to-know", category: "annexeA" },
  { id: "A.8.4", title: "Accès au code source", description: "Protection du code", category: "annexeA" },
  { id: "A.8.5", title: "Authentification sécurisée", description: "MFA, mots de passe", category: "annexeA" },
  { id: "A.8.6", title: "Gestion de capacité", description: "Capacité et performance", category: "annexeA" },
  { id: "A.8.7", title: "Protection anti-malware", description: "Défenses malware", category: "annexeA" },
  { id: "A.8.8", title: "Gestion des vulnérabilités techniques", description: "Détection et remédiation", category: "annexeA" },
  { id: "A.8.9", title: "Gestion des configurations", description: "Configurations sécurisées", category: "annexeA" },
  { id: "A.8.10", title: "Suppression de l’information", description: "Effacement sécurisé", category: "annexeA" },
  { id: "A.8.11", title: "Masquage des données", description: "Masquage/pseudonymisation", category: "annexeA" },
  { id: "A.8.12", title: "Prévention de fuite de données", description: "DLP et contrôles", category: "annexeA" },
  { id: "A.8.13", title: "Sauvegarde", description: "Backups et restauration", category: "annexeA" },
  { id: "A.8.14", title: "Redondance", description: "Résilience infrastructure", category: "annexeA" },
  { id: "A.8.15", title: "Journalisation", description: "Logs et intégrité", category: "annexeA" },
  { id: "A.8.16", title: "Surveillance des activités", description: "Monitoring continu", category: "annexeA" },
  { id: "A.8.17", title: "Synchronisation des horloges", description: "Temps fiable", category: "annexeA" },
  { id: "A.8.18", title: "Programmes utilitaires privilégiés", description: "Outils admin contrôlés", category: "annexeA" },
  { id: "A.8.19", title: "Installation de logiciels", description: "Contrôle des installations", category: "annexeA" },
  { id: "A.8.20", title: "Sécurité réseau", description: "Conception et protection réseau", category: "annexeA" },
  { id: "A.8.21", title: "Services réseau", description: "Sécurité des services fournis", category: "annexeA" },
  { id: "A.8.22", title: "Segmentation réseau", description: "Segmentation logique/physique", category: "annexeA" },
  { id: "A.8.23", title: "Filtrage web", description: "Contrôle d’accès web", category: "annexeA" },
  { id: "A.8.24", title: "Cryptographie", description: "Utilisation appropriée", category: "annexeA" },
  { id: "A.8.25", title: "Cycle de vie de développement sécurisé", description: "SecDevOps", category: "annexeA" },
  { id: "A.8.26", title: "Exigences de sécurité applicative", description: "Spécifier et valider", category: "annexeA" },
  { id: "A.8.27", title: "Architecture et ingénierie sécurisées", description: "Principes de conception", category: "annexeA" },
  { id: "A.8.28", title: "Codage sécurisé", description: "Pratiques de dev", category: "annexeA" },
  { id: "A.8.29", title: "Tests de sécurité", description: "Tests dans le cycle", category: "annexeA" },
  { id: "A.8.30", title: "Développement externalisé", description: "Contrôles sur tiers", category: "annexeA" },
  { id: "A.8.31", title: "Séparation dev/test/prod", description: "Environnements isolés", category: "annexeA" },
  { id: "A.8.32", title: "Gestion des changements", description: "Change management", category: "annexeA" },
  { id: "A.8.33", title: "Données de test", description: "Données non sensibles", category: "annexeA" },
  { id: "A.8.34", title: "Protection en cas d’audit technique", description: "Sécurité pendant les audits", category: "annexeA" },
];

const docsByRequirement: Record<string, string[]> = {
  "5.2": ["DOC-001"],
  "6.1.2": ["DOC-002"],
  "6.1.3": ["DOC-002"],
  "A.5.1": ["DOC-001"],
  "A.5.7": ["DOC-003"],
  "A.5.23": ["DOC-004"],
  "A.5.30": ["DOC-005"],
  "A.8.13": ["DOC-006"],
  "A.8.16": ["DOC-005"],
};

const documentIdsCatalog = mockDocuments.map((doc) => doc.id);

const computeProgress = (id: string) => {
  const digits = parseInt(id.replace(/\D/g, ""), 10) || 1;
  const raw = (digits * 7) % 101;
  return Math.min(95, Math.max(10, raw));
};

const statusFromProgress = (progress: number): CoverageStatus => {
  if (progress >= 70) return "couvert";
  if (progress >= 35) return "partiellement couvert";
  return "non couvert";
};

const requirementsData: RequirementCoverage[] = [...clauseRequirements, ...annexARequirements].map(
  (req) => {
    const progress = computeProgress(req.id);
    const documents = docsByRequirement[req.id] || [];
    const adjustedProgress = documents.length > 0 ? Math.min(100, progress + 5) : progress;
    const status = statusFromProgress(adjustedProgress);

    return {
      requirement: req,
      documents,
      status,
      progress: adjustedProgress,
    };
  }
);

const statusSortOrder: Record<CoverageStatus, number> = {
  "non couvert": 0,
  "partiellement couvert": 1,
  couvert: 2,
};

const progressTone = (value: number) => {
  if (value >= 70) return "high";
  if (value >= 35) return "medium";
  return "low";
};

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const RequirementsMatrix: React.FC = () => {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<RequirementCoverage[]>(requirementsData);

  const updateRow = (id: string, updater: (row: RequirementCoverage) => RequirementCoverage) => {
    setRows((prev) => prev.map((row) => (row.requirement.id === id ? updater(row) : row)));
  };

  const summary = useMemo(() => {
    const totals = rows.length;
    const counts = rows.reduce(
      (acc, item) => {
        acc[item.status] += 1;
        return acc;
      },
      { "non couvert": 0, "partiellement couvert": 0, couvert: 0 } as Record<CoverageStatus, number>
    );
    const avgProgress = rows.reduce((acc, item) => acc + item.progress, 0) / Math.max(totals, 1);
    return { totals, counts, avgProgress };
  }, [rows]);

  const sortedRows = useMemo(() => {
    const filtered = rows.filter((row) => {
      if (!search.trim()) return true;
      const q = normalizeText(search);
      return (
        normalizeText(row.requirement.id).includes(q) ||
        normalizeText(row.requirement.title).includes(q) ||
        normalizeText(row.requirement.description).includes(q) ||
        row.documents.some((doc) => normalizeText(doc).includes(q))
      );
    });

    return filtered.sort((a, b) => {
      if (a.requirement.category !== b.requirement.category) {
        return a.requirement.category === "clause" ? -1 : 1;
      }
      if (a.requirement.id === b.requirement.id) return 0;
      return a.requirement.id.localeCompare(b.requirement.id, "fr", { numeric: true });
    });
  }, [search, rows]);

  const handleAddDocument = (id: string, docId: string) => {
    if (!docId) return;
    updateRow(id, (row) => {
      if (row.documents.includes(docId)) return row;
      return { ...row, documents: [...row.documents, docId] };
    });
  };

  const handleRemoveDocument = (id: string, docId: string) => {
    updateRow(id, (row) => ({ ...row, documents: row.documents.filter((d) => d !== docId) }));
  };

  const handleStatusChange = (id: string, value: CoverageStatus) => {
    updateRow(id, (row) => ({
      ...row,
      status: value,
    }));
  };

  const handleProgressChange = (id: string, value: string) => {
    const num = Math.max(0, Math.min(100, Number(value) || 0));
    updateRow(id, (row) => ({
      ...row,
      progress: num,
      status: statusFromProgress(num),
    }));
  };

  return (
    <div className="req-panel">
      <div className="req-header req-header--sticky">
        <div>
          <h3>Matrice des exigences ISO 27001:2022</h3>
          <p>
            Clauses 4 à 10 et Annexe A (93 contrôles), avec niveau de couverture et documents liés.
          </p>
        </div>
        <div className="req-chips">
          <span className="req-chip neutral">{summary.totals} exigences</span>
          <span className="req-chip success">{summary.counts["couvert"]} couvertes</span>
          <span className="req-chip warning">
            {summary.counts["partiellement couvert"]} partiel
          </span>
          <span className="req-chip danger">{summary.counts["non couvert"]} manquantes</span>
          <span className="req-chip neutral">Progression moyenne {summary.avgProgress.toFixed(0)}%</span>
        </div>
      </div>

      <div className="req-toolbar req-toolbar--sticky">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="req-search"
          placeholder="Rechercher par réf, intitulé ou document (ex: A.8.13, sauvegarde, DOC-001)"
        />
        <span className="req-filter-count">{sortedRows.length} résultat(s)</span>
      </div>

      <div className="req-table-wrapper">
        <table className="req-table">
          <thead>
            <tr>
              <th>Réf.</th>
              <th>Intitulé</th>
              <th>Type</th>
              <th>Documents liés</th>
              <th>Couverture</th>
              <th>Progression</th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, index) => {
              const prev = sortedRows[index - 1];
              const isNewSection = !prev || prev.requirement.category !== row.requirement.category;
              return (
                <React.Fragment key={row.requirement.id}>
                  {isNewSection && (
                    <tr className="req-section-row">
                      <td colSpan={6} className="req-section-title">
                        {row.requirement.category === "clause"
                          ? "Clauses 4 à 10"
                          : "Annexe A – Contrôles"}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="req-id">{row.requirement.id}</td>
                    <td>
                      <div className="req-title">{row.requirement.title}</div>
                      <div className="req-desc">{row.requirement.description}</div>
                    </td>
                    <td>
                      <span className={`req-badge type-${row.requirement.category}`}>
                        {row.requirement.category === "clause" ? "Clause" : "Annexe A"}
                      </span>
                    </td>
                    <td>
                      <div className="req-docs-edit">
                        {row.documents.length > 0 ? (
                          <div className="req-docs">
                            {row.documents.map((doc) => (
                              <span key={doc} className="req-doc-chip">
                                {doc}
                                <button
                                  type="button"
                                  className="req-doc-chip__remove"
                                  onClick={() => handleRemoveDocument(row.requirement.id, doc)}
                                  aria-label={`Retirer ${doc}`}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="req-doc-chip empty">Aucun doc</span>
                        )}
                        <div className="req-docs-add">
                          <select
                            className="req-input req-input--compact"
                            defaultValue=""
                            onChange={(e) => {
                              handleAddDocument(row.requirement.id, e.target.value);
                              e.target.value = "";
                            }}
                          >
                            <option value="">+ Ajouter un doc</option>
                            {documentIdsCatalog.map((docId) => (
                              <option key={docId} value={docId} disabled={row.documents.includes(docId)}>
                                {docId}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                    <td>
                      <select
                        className={`req-input req-input--compact req-status-select status-${statusSortOrder[row.status]}`}
                        value={row.status}
                        onChange={(e) =>
                          handleStatusChange(row.requirement.id, e.target.value as CoverageStatus)
                        }
                      >
                        <option value="non couvert">Non couvert</option>
                        <option value="partiellement couvert">Partiellement couvert</option>
                        <option value="couvert">Couvert</option>
                      </select>
                    </td>
                    <td>
                      <div className="req-progress">
                        <div
                          className={`req-progress__bar tone-${progressTone(row.progress)}`}
                          style={{ width: `${row.progress}%` }}
                          aria-label={`Progression ${row.progress}%`}
                        />
                        <span className="req-progress__value">{row.progress}%</span>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={row.progress}
                          onChange={(e) => handleProgressChange(row.requirement.id, e.target.value)}
                          className="req-progress__input"
                        />
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequirementsMatrix;
