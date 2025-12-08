import React, { useMemo, useState } from "react";
import type { DocumentMetadata, DocumentStatus } from "../../types/documents";
import { mockDocuments as catalogDocuments } from "../../data/mockDocuments";

import "./DocumentTable.css";

type DocumentForm = {
  id: string;
  title: string;
  isoRefs: string;
  status: DocumentStatus;
  lastReviewDate: string;
  owner: string;
};

const initialDocuments: DocumentMetadata[] = catalogDocuments.map((d) => ({ ...d }));

const statusOptions: DocumentStatus[] = ["brouillon", "en revue", "validé", "obsolète"];
const statusClassName: Record<DocumentStatus, string> = {
  brouillon: "brouillon",
  "en revue": "en-revue",
  validé: "valide",
  obsolète: "obsolete",
};

const today = () => new Date().toISOString().slice(0, 10);

const emptyForm = (): DocumentForm => ({
  id: "",
  title: "",
  isoRefs: "",
  status: "brouillon",
  lastReviewDate: today(),
  owner: "",
});

const normalizeIsoRefs = (value: string) =>
  value
    .split(",")
    .map((ref) => ref.trim())
    .filter(Boolean);

const DocumentTable: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentMetadata[]>(initialDocuments);
  const [createForm, setCreateForm] = useState<DocumentForm>(() => emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<DocumentForm | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const totalDocs = useMemo(() => documents.length, [documents]);

  const showMessage = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(null), 2500);
  };

  const handleCreateChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCreateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditForm((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleCreateSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!createForm.id.trim() || !createForm.title.trim()) {
      showMessage("Référence et titre sont requis pour ajouter un document.");
      return;
    }
    if (documents.some((doc) => doc.id.toLowerCase() === createForm.id.trim().toLowerCase())) {
      showMessage("Cette référence existe déjà.");
      return;
    }

    const newDoc: DocumentMetadata = {
      id: createForm.id.trim(),
      title: createForm.title.trim(),
      isoReferences: normalizeIsoRefs(createForm.isoRefs),
      status: createForm.status,
      lastReviewDate: createForm.lastReviewDate || today(),
      owner: createForm.owner.trim() || "Non assigné",
    };

    setDocuments((prev) => [...prev, newDoc]);
    setCreateForm(emptyForm());
    showMessage("Document ajouté.");
  };

  const startEdit = (doc: DocumentMetadata) => {
    setEditingId(doc.id);
    setEditForm({
      id: doc.id,
      title: doc.title,
      isoRefs: doc.isoReferences.join(", "),
      status: doc.status,
      lastReviewDate: doc.lastReviewDate,
      owner: doc.owner,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEdit = (id: string) => {
    if (!editForm) return;
    if (!editForm.title.trim()) {
      showMessage("Le titre est requis.");
      return;
    }

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              title: editForm.title.trim(),
              isoReferences: normalizeIsoRefs(editForm.isoRefs),
              status: editForm.status,
              lastReviewDate: editForm.lastReviewDate || today(),
              owner: editForm.owner.trim() || "Non assigné",
            }
          : doc
      )
    );

    cancelEdit();
    showMessage("Document mis à jour.");
  };

  const deleteDoc = (id: string) => {
    if (!window.confirm("Supprimer ce document ?")) return;
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    if (editingId === id) {
      cancelEdit();
    }
    showMessage("Document supprimé.");
  };

  return (
    <div className="doc-panel">
      <div className="doc-panel__header">
        <div>
          <h3>Tableau de bord documentaire</h3>
          <p>Ajoute, modifie ou supprime les documents du SMSI.</p>
        </div>
        <span className="doc-chip">{totalDocs} docs</span>
      </div>

      {message && <div className="doc-alert">{message}</div>}

      <form className="doc-form" onSubmit={handleCreateSubmit}>
        <div className="doc-form-grid">
          <label className="doc-field">
            <span>Référence</span>
            <input
              name="id"
              value={createForm.id}
              onChange={handleCreateChange}
              placeholder="DOC-004"
            />
          </label>
          <label className="doc-field">
            <span>Titre</span>
            <input
              name="title"
              value={createForm.title}
              onChange={handleCreateChange}
              placeholder="Procédure sauvegarde"
            />
          </label>
          <label className="doc-field">
            <span>Réf. ISO (séparées par des virgules)</span>
            <input
              name="isoRefs"
              value={createForm.isoRefs}
              onChange={handleCreateChange}
              placeholder="A.5.1, A.5.2"
            />
          </label>
          <label className="doc-field">
            <span>Statut</span>
            <select name="status" value={createForm.status} onChange={handleCreateChange}>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label className="doc-field">
            <span>Dernière revue</span>
            <input
              type="date"
              name="lastReviewDate"
              value={createForm.lastReviewDate}
              onChange={handleCreateChange}
            />
          </label>
          <label className="doc-field">
            <span>Propriétaire</span>
            <input
              name="owner"
              value={createForm.owner}
              onChange={handleCreateChange}
              placeholder="Responsable"
            />
          </label>
        </div>
        <div className="doc-form-actions">
          <button className="doc-btn secondary" type="button" onClick={() => setCreateForm(emptyForm())}>
            Réinitialiser
          </button>
          <button className="doc-btn primary" type="submit">
            Ajouter le document
          </button>
        </div>
      </form>

      <div className="doc-table-wrapper">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Réf.</th>
              <th>Titre</th>
              <th>Réf. ISO 27001</th>
              <th>Statut</th>
              <th>Dernière revue</th>
              <th>Propriétaire</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => {
              const isEditing = editingId === doc.id;
              if (isEditing && editForm) {
                return (
                  <tr key={doc.id}>
                    <td>{doc.id}</td>
                    <td>
                      <input
                        name="title"
                        value={editForm.title}
                        onChange={handleEditChange}
                        className="doc-input-inline"
                      />
                    </td>
                    <td>
                      <input
                        name="isoRefs"
                        value={editForm.isoRefs}
                        onChange={handleEditChange}
                        className="doc-input-inline"
                      />
                    </td>
                    <td>
                      <select
                        name="status"
                        value={editForm.status}
                        onChange={handleEditChange}
                        className="doc-input-inline"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="date"
                        name="lastReviewDate"
                        value={editForm.lastReviewDate}
                        onChange={handleEditChange}
                        className="doc-input-inline"
                      />
                    </td>
                    <td>
                      <input
                        name="owner"
                        value={editForm.owner}
                        onChange={handleEditChange}
                        className="doc-input-inline"
                      />
                    </td>
                    <td className="doc-actions">
                      <button className="doc-btn primary" type="button" onClick={() => saveEdit(doc.id)}>
                        Enregistrer
                      </button>
                      <button className="doc-btn secondary" type="button" onClick={cancelEdit}>
                        Annuler
                      </button>
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={doc.id}>
                  <td>{doc.id}</td>
                  <td>{doc.title}</td>
                  <td>{doc.isoReferences.join(", ")}</td>
                  <td>
                    <span className={`doc-badge status-${statusClassName[doc.status]}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td>{doc.lastReviewDate}</td>
                  <td>{doc.owner}</td>
                  <td className="doc-actions">
                    <button className="doc-btn secondary" type="button" onClick={() => startEdit(doc)}>
                      Modifier
                    </button>
                    <button className="doc-btn danger" type="button" onClick={() => deleteDoc(doc.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentTable;
