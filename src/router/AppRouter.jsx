import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import DashboardCoordinador from "../pages/coordinador/DashboardCoordinador";
import DashboardDocente from "../pages/docente/DashboardDocente";
import DashboardEstudiante from "../pages/estudiante/DashboardEstudiante";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("usuario") || "null");
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<ProtectedRoute><DashboardAdmin /></ProtectedRoute>} />
        <Route path="/coordinador/*" element={<ProtectedRoute><DashboardCoordinador /></ProtectedRoute>} />
        <Route path="/docente/*" element={<ProtectedRoute><DashboardDocente /></ProtectedRoute>} />
        <Route path="/estudiante/*" element={<ProtectedRoute><DashboardEstudiante /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
