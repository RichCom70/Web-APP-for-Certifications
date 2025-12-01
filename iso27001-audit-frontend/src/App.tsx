import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import DashboardPage from "./pages/Dashboard/DashboardPage";
import DocumentsPage from "./pages/Documents/DocumentsPage";
import RequirementsMatrixPage from "./pages/Requirements/RequirementsMatrixPage";
// Temporary stub for missing GapAnalysisPage module
const GapAnalysisPage: React.FC = () => {
  return <div>Gap Analysis - placeholder</div>;
};
import { AuditReadinessPage } from "./pages/AuditReadiness/AuditReadinessPage";
import SettingsPage from "./pages/Settings/SettingsPage";

const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/requirements" element={<RequirementsMatrixPage />} />
        <Route path="/gap-analysis" element={<GapAnalysisPage />} />
        <Route path="/audit-readiness" element={<AuditReadinessPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </MainLayout>
  );
};

export default App;

