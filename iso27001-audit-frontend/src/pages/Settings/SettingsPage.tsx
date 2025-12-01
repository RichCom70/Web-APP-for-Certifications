import React, { useState } from "react";

interface SettingsForm {
  organizationName: string;
  ismsScope: string;
  ismsManager: string;
  isoVersion: "2013" | "2022";
  targetCertificationDate: string;
  riskScale: "3" | "4" | "5";
  language: "fr" | "en";
  timezone: string;
}

const SettingsPage: React.FC = () => {
  const [form, setForm] = useState<SettingsForm>({
    organizationName: "",
    ismsScope: "",
    ismsManager: "",
    isoVersion: "2022",
    targetCertificationDate: "",
    riskScale: "4",
    language: "fr",
    timezone: "Europe/Paris",
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // TODO: appeler l’API backend ici pour persister les paramètres
    console.log("Settings saved:", form);

    setStatusMessage("Paramètres enregistrés (simulation, pas encore de backend).");
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <section>
      <h2>Paramètres de l’application</h2>
      <p>
        Configure les informations de ton organisation, les paramètres de l’audit ISO 27001
        et les préférences d’affichage. Ces paramètres seront utilisés pour personnaliser
        les tableaux de bord et les rapports.
      </p>

      {statusMessage && <div className="alert-success">{statusMessage}</div>}

      <form onSubmit={handleSubmit} className="settings-grid">
        {/* Bloc 1 : Organisation & SMSI */}
        <div className="card">
          <h3>Organisation & SMSI</h3>
          <div className="form-group">
            <label htmlFor="organizationName">Nom de l'organisation</label>
            <input
              id="organizationName"
              name="organizationName"
              value={form.organizationName}
              onChange={handleChange}
              type="text"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ismsScope">Périmètre SMSI</label>
            <textarea
              id="ismsScope"
              name="ismsScope"
              value={form.ismsScope}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ismsManager">Responsable SMSI</label>
            <input
              id="ismsManager"
              name="ismsManager"
              value={form.ismsManager}
              onChange={handleChange}
              type="text"
            />
          </div>
        </div>

        {/* Bloc 2 : ISO */}
        <div className="card">
          <h3>Paramètres ISO</h3>

          <div className="form-group">
            <label htmlFor="isoVersion">Version ISO</label>
            <select
              id="isoVersion"
              name="isoVersion"
              value={form.isoVersion}
              onChange={handleChange}
            >
              <option value="2013">2013</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="targetCertificationDate">Date cible de certification</label>
            <input
              id="targetCertificationDate"
              name="targetCertificationDate"
              type="date"
              value={form.targetCertificationDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="riskScale">Échelle de risque</label>
            <select id="riskScale" name="riskScale" value={form.riskScale} onChange={handleChange}>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

        {/* Bloc 3 : Préférences */}
        <div className="card">
          <h3>Préférences</h3>

          <div className="form-group">
            <label htmlFor="language">Langue</label>
            <select id="language" name="language" value={form.language} onChange={handleChange}>
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="timezone">Fuseau horaire</label>
            <input
              id="timezone"
              name="timezone"
              value={form.timezone}
              onChange={handleChange}
              type="text"
            />
          </div>
        </div>

        <div className="actions">
          <button type="submit">Enregistrer</button>
        </div>
      </form>
    </section>
  );
};

export default SettingsPage;

