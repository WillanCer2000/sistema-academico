import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Building2,
  ClipboardList, Calendar, LogOut, Menu, X, ChevronRight,
  UserCog, School, BookMarked, Layers, BarChart2, FileText,
  MonitorCheck, Bell
} from "lucide-react";

const menusPorRol = {
  administrador: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { label: "Coordinadores", icon: UserCog, path: "/admin/coordinadores" },
    { label: "Docentes", icon: Users, path: "/admin/docentes" },
    { label: "Estudiantes", icon: GraduationCap, path: "/admin/estudiantes" },
    { label: "Facultades", icon: Building2, path: "/admin/facultades" },
    { label: "Programas", icon: School, path: "/admin/programas" },
    { label: "Aulas", icon: LayoutDashboard, path: "/admin/aulas" },
    { label: "Materias", icon: BookOpen, path: "/admin/materias" },
  ],
  coordinador: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/coordinador" },
    { label: "Carga Académica", icon: ClipboardList, path: "/coordinador/carga-academica" },
    { label: "Horario Docente", icon: Calendar, path: "/coordinador/horario-docente" },
    { label: "Horario Estudiante", icon: Calendar, path: "/coordinador/horario-estudiante" },
    { label: "Microcurrículo", icon: BookMarked, path: "/coordinador/microcurriculo" },
    { label: "Plan Microcurrículo", icon: Layers, path: "/coordinador/plan-microcurriculo" },
    { label: "Seguimiento", icon: BarChart2, path: "/coordinador/seguimiento" },
  ],
  docente: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/docente" },
    { label: "Mi Horario", icon: Calendar, path: "/docente/horario" },
    { label: "Mis Materias", icon: BookOpen, path: "/docente/materias" },
    { label: "Calificaciones", icon: ClipboardList, path: "/docente/calificaciones" },
    { label: "Plan Microcurrículo", icon: FileText, path: "/docente/plan-microcurriculo" },
    { label: "Asistencia", icon: MonitorCheck, path: "/docente/asistencia" },
  ],
  estudiante: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/estudiante" },
    { label: "Mi Horario", icon: Calendar, path: "/estudiante/horario" },
    { label: "Mis Asistencias", icon: MonitorCheck, path: "/estudiante/asistencias" },
    { label: "Plan Académico", icon: FileText, path: "/estudiante/plan" },
  ],
};

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("usuario") || "{}");
  const menus = menusPorRol[user.rol] || [];

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const rolLabel = {
    administrador: "Administrador",
    coordinador: "Coordinador",
    docente: "Docente",
    estudiante: "Estudiante",
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-16"} bg-[#1B2A4A] text-white flex flex-col transition-all duration-300 ease-in-out`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
          {sidebarOpen && (
            <div>
              <p className="text-sm font-bold tracking-wide">SISTEMA</p>
              <p className="text-xs text-blue-300">ACADÉMICO</p>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded hover:bg-white/10 transition">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* User info */}
        {sidebarOpen && (
          <div className="px-4 py-4 border-b border-white/10">
            <div className="w-9 h-9 rounded-full bg-blue-400 flex items-center justify-center text-sm font-bold mb-2">
              {user.nombre?.charAt(0) || "U"}
            </div>
            <p className="text-sm font-semibold truncate">{user.nombre}</p>
            <p className="text-xs text-blue-300">{rolLabel[user.rol]}</p>
          </div>
        )}

        {/* Menu items */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {menus.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                  ${isActive ? "bg-white/20 text-white font-semibold" : "text-blue-100 hover:bg-white/10"}`}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
                {sidebarOpen && isActive && <ChevronRight size={14} className="ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-2 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-300 hover:bg-white/10 transition"
          >
            <LogOut size={18} className="shrink-0" />
            {sidebarOpen && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Sistema Académico Universitario</h1>
            <p className="text-xs text-gray-400">Gestión académica integral</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition">
              <Bell size={18} className="text-gray-500" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#1B2A4A] flex items-center justify-center text-white text-sm font-bold">
              {user.nombre?.charAt(0) || "U"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
