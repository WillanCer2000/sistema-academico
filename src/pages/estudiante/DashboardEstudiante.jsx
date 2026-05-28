import { Routes, Route } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import {
  horarioEstudiante, asistencias, detalleAsistencia,
  planMicrocurriculo, detallePlanMicrocurriculo, materias
} from "../../data/mockData";
import { Calendar, MonitorCheck, FileText, BookOpen, CheckCircle, XCircle, Clock } from "lucide-react";

// ── Componentes reutilizables ──────────────────────────────────────────────

function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ── Home Dashboard ─────────────────────────────────────────────────────────

function HomeDashboard() {
  const user = JSON.parse(localStorage.getItem("usuario") || "{}");
  const stats = [
    { icon: BookOpen, label: "Materias Inscritas", value: horarioEstudiante.length, color: "bg-[#1B2A4A]" },
    { icon: Calendar, label: "Clases Semanales", value: horarioEstudiante.length, color: "bg-blue-500" },
    { icon: MonitorCheck, label: "Registros Asistencia", value: detalleAsistencia.length, color: "bg-indigo-500" },
    { icon: FileText, label: "Planes Activos", value: planMicrocurriculo.length, color: "bg-slate-500" },
  ];
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Bienvenido, {user.nombre}</h2>
        <p className="text-sm text-gray-500 mt-1">Aquí puedes ver tu información académica</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
              <s.icon size={22} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Próximas clases */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Mis Materias</h3>
        <div className="space-y-3">
          {horarioEstudiante.slice(0, 3).map((h, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-[#1B2A4A] flex items-center justify-center">
                <BookOpen size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700">{h.nombreMateria}</p>
                <p className="text-xs text-gray-400">{h.dia} · {h.hora} · {h.nombreAula}</p>
              </div>
              <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full">Grupo {h.grupo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Mi Horario ─────────────────────────────────────────────────────────────

function MiHorario() {
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const horas = ["07:00-09:00", "09:00-11:00", "11:00-13:00", "14:00-16:00", "16:00-18:00"];
  return (
    <div>
      <PageHeader title="Mi Horario" subtitle="Vista semanal de mis clases" />
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 text-left">Hora</th>
                {dias.map(d => <th key={d} className="px-4 py-3 text-xs font-semibold text-gray-500 text-center">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {horas.map((hora, i) => (
                <tr key={hora} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                  <td className="px-4 py-3 text-xs font-medium text-gray-500 whitespace-nowrap">{hora}</td>
                  {dias.map(dia => {
                    const clase = horarioEstudiante.find(h => h.hora === hora && h.dia === dia);
                    return (
                      <td key={dia} className="px-2 py-2 text-center">
                        {clase ? (
                          <div className="bg-[#1B2A4A] text-white rounded-lg px-2 py-1.5 text-xs">
                            <p className="font-semibold">{clase.nombreMateria}</p>
                            <p className="text-blue-200">{clase.nombreAula}</p>
                            <p className="text-blue-300">Grupo {clase.grupo}</p>
                          </div>
                        ) : <span className="text-gray-200">—</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lista detallada */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Detalle de Materias</h3>
        <div className="space-y-2">
          {horarioEstudiante.map((h, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Clock size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{h.nombreMateria}</p>
                  <p className="text-xs text-gray-400">{h.codigoMateria}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-600">{h.dia} · {h.hora}</p>
                <p className="text-xs text-gray-400">{h.nombreAula} · Grupo {h.grupo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Mis Asistencias ────────────────────────────────────────────────────────

function MisAsistencias() {
  const presente = detalleAsistencia.filter(d => d.estado === "Presente").length;
  const ausente = detalleAsistencia.filter(d => d.estado === "Ausente").length;
  const total = detalleAsistencia.length;
  const porcentaje = total > 0 ? Math.round((presente / total) * 100) : 0;

  return (
    <div>
      <PageHeader title="Mis Asistencias" subtitle="Historial de asistencia a clases" />

      {/* Resumen */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{presente}</p>
          <p className="text-xs text-gray-500 mt-1">Presencias</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-red-500">{ausente}</p>
          <p className="text-xs text-gray-500 mt-1">Ausencias</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-[#1B2A4A]">{porcentaje}%</p>
          <p className="text-xs text-gray-500 mt-1">Asistencia</p>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700">Porcentaje de Asistencia</p>
          <p className="text-sm font-bold text-[#1B2A4A]">{porcentaje}%</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all ${porcentaje >= 75 ? "bg-green-500" : porcentaje >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
            style={{ width: `${porcentaje}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Mínimo requerido: 75%</p>
      </div>

      {/* Historial */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <p className="text-sm font-semibold text-gray-700">Historial Detallado</p>
        </div>
        <div className="divide-y divide-gray-100">
          {detalleAsistencia.map((d, i) => {
            const asistencia = asistencias.find(a => a.codigoAsistencia === d.codigoAsistencia);
            return (
              <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition">
                <div>
                  <p className="text-sm font-medium text-gray-700">{asistencia?.asignatura || "—"}</p>
                  <p className="text-xs text-gray-400">{asistencia?.fecha} · {asistencia?.hora} · {asistencia?.nombreAula}</p>
                  <p className="text-xs text-gray-400">Tema: {asistencia?.tema}</p>
                </div>
                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${d.estado === "Presente" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                  {d.estado === "Presente" ? <CheckCircle size={12} /> : <XCircle size={12} />}
                  {d.estado}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Plan Académico ─────────────────────────────────────────────────────────

function PlanAcademico() {
  return (
    <div>
      <PageHeader title="Plan Académico" subtitle="Seguimiento del plan microcurrículo" />
      <div className="space-y-4">
        {planMicrocurriculo.map((plan, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{plan.materia}</h3>
                <p className="text-sm text-gray-500">{plan.programa} · {plan.periodoAcademico}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Docente</p>
                <p className="text-sm font-medium text-gray-700">{plan.nombreDocente} {plan.apellidoDocente}</p>
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[["Créditos", plan.creditos], ["Total Horas", plan.totalHoras], ["Inicio", plan.fechaInicio], ["Fin", plan.fechaTerminacion]].map(([label, val]) => (
                  <div key={label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-gray-700">{val}</p>
                  </div>
                ))}
              </div>
              {/* Detalle semanas */}
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Plan Semanal</p>
              <div className="space-y-2">
                {detallePlanMicrocurriculo.filter(d => d.codigoPlan === plan.codigoPlan).map((det, j) => (
                  <div key={j} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-[#1B2A4A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {det.semana}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">{det.tema}</p>
                      <p className="text-xs text-gray-400">Actividad: {det.actividad} · Recurso: {det.recurso}</p>
                      <p className="text-xs text-gray-400">Evaluación: {det.evaluacion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Export ─────────────────────────────────────────────────────────────────

export default function DashboardEstudiante() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/horario" element={<MiHorario />} />
        <Route path="/asistencias" element={<MisAsistencias />} />
        <Route path="/plan" element={<PlanAcademico />} />
      </Routes>
    </Layout>
  );
}
