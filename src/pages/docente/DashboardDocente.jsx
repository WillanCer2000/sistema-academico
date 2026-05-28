import { Routes, Route } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import {
  horarioDocente, materiaDocente, asistencias, detalleAsistencia,
  planMicrocurriculo, detallePlanMicrocurriculo, estudiantes
} from "../../data/mockData";
import { Calendar, BookOpen, ClipboardList, FileText, MonitorCheck, Plus, Pencil, Trash2, X, CheckCircle, XCircle } from "lucide-react";

// ── Componentes reutilizables ──────────────────────────────────────────────

function PageHeader({ title, subtitle, onAdd }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {onAdd && (
        <button onClick={onAdd} className="flex items-center gap-2 bg-[#1B2A4A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#243660] transition">
          <Plus size={16} /> Nuevo
        </button>
      )}
    </div>
  );
}

function Table({ columns, data, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((col) => (
                <th key={col} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{col}</th>
              ))}
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50 transition ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                {Object.values(row).filter(v => typeof v !== "object").slice(0, columns.length).map((val, j) => (
                  <td key={j} className="px-4 py-3 text-gray-700">{val}</td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {onEdit && <button onClick={() => onEdit(row)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition"><Pencil size={14} /></button>}
                    {onDelete && <button onClick={() => onDelete(row)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition"><Trash2 size={14} /></button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 transition"><X size={18} /></button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", options }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {options ? (
        <select name={name} value={value} onChange={onChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/30">
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/30" />
      )}
    </div>
  );
}

// ── Home Dashboard ─────────────────────────────────────────────────────────

function HomeDashboard() {
  const stats = [
    { icon: BookOpen, label: "Mis Materias", value: materiaDocente.length, color: "bg-[#1B2A4A]" },
    { icon: Calendar, label: "Clases Semanales", value: horarioDocente.length, color: "bg-blue-500" },
    { icon: MonitorCheck, label: "Registros Asistencia", value: asistencias.length, color: "bg-indigo-500" },
    { icon: FileText, label: "Planes Activos", value: planMicrocurriculo.length, color: "bg-slate-500" },
  ];
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Panel del Docente</h2>
        <p className="text-sm text-gray-500 mt-1">Gestión de clases y seguimiento académico</p>
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
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-3">Mis Materias Asignadas</h3>
        <div className="space-y-2">
          {materiaDocente.map((m, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-700">{m.nombreMateria}</p>
                <p className="text-xs text-gray-400">Código: {m.codigoMateria}</p>
              </div>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">Activa</span>
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
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
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
                    const clase = horarioDocente.find(h => h.hora === hora && h.dia === dia);
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
    </div>
  );
}

// ── Mis Materias ───────────────────────────────────────────────────────────

function MisMaterias() {
  const cols = ["Código", "Docente", "Código Materia", "Nombre Materia"];
  const tableData = materiaDocente.map(d => ({
    Codigo: d.codigoMateriaDocente,
    Docente: d.nombreDocente,
    CodigoMateria: d.codigoMateria,
    NombreMateria: d.nombreMateria,
    _raw: d
  }));
  return (
    <div>
      <PageHeader title="Mis Materias" subtitle="Materias asignadas al docente" />
      <Table columns={cols} data={tableData} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}

// ── Calificaciones ─────────────────────────────────────────────────────────

function Calificaciones() {
  const [califs, setCalifs] = useState(
    estudiantes.map(e => ({ ...e, parcial1: "", parcial2: "", parcial3: "", definitiva: "" }))
  );
  const handleChange = (id, campo, valor) => {
    setCalifs(califs.map(c => {
      if (c.idEstudiante !== id) return c;
      const updated = { ...c, [campo]: valor };
      const p1 = parseFloat(updated.parcial1) || 0;
      const p2 = parseFloat(updated.parcial2) || 0;
      const p3 = parseFloat(updated.parcial3) || 0;
      updated.definitiva = ((p1 * 0.3) + (p2 * 0.3) + (p3 * 0.4)).toFixed(1);
      return updated;
    }));
  };
  return (
    <div>
      <PageHeader title="Gestionar Calificaciones" subtitle="Registro de notas por estudiante" />
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["Estudiante", "Programa", "1er Parcial (30%)", "2do Parcial (30%)", "3er Parcial (40%)", "Definitiva"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {califs.map((est, i) => (
                <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-700">{est.nombre} {est.apellido}</p>
                    <p className="text-xs text-gray-400">{est.idEstudiante}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{est.nombrePrograma}</td>
                  {["parcial1", "parcial2", "parcial3"].map(p => (
                    <td key={p} className="px-4 py-3">
                      <input
                        type="number" min="0" max="5" step="0.1"
                        value={est[p]}
                        onChange={(e) => handleChange(est.idEstudiante, p, e.target.value)}
                        className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/30"
                        placeholder="0.0"
                      />
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${parseFloat(est.definitiva) >= 3 ? "bg-green-50 text-green-700 border border-green-100" : est.definitiva ? "bg-red-50 text-red-600 border border-red-100" : "bg-gray-100 text-gray-500"}`}>
                      {est.definitiva || "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Plan Microcurrículo ────────────────────────────────────────────────────

function PlanMicrocurriculo() {
  const [data, setData] = useState(detallePlanMicrocurriculo);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    if (form.id) setData(data.map(d => d.id === form.id ? form : d));
    else setData([...data, { ...form, id: Date.now() }]);
    setModal(false);
  };
  const cols = ["Código", "Plan", "Semana", "Tema", "Actividad", "Recurso", "Evaluación"];
  const tableData = data.map(d => ({ Codigo: d.codigoDetalle, Plan: d.codigoPlan, Semana: d.semana, Tema: d.tema, Actividad: d.actividad, Recurso: d.recurso, Evaluacion: d.evaluacion, _raw: d }));
  return (
    <div>
      <PageHeader title="Plan Microcurrículo" subtitle="Detalle semanal del plan de clase" onAdd={() => { setForm({}); setModal(true); }} />
      <Table columns={cols} data={tableData} onEdit={(r) => { setForm(r._raw); setModal(true); }} onDelete={(r) => setData(data.filter(d => d.id !== r._raw.id))} />
      {modal && (
        <Modal title="Detalle Plan" onClose={() => setModal(false)}>
          <div className="grid grid-cols-2 gap-3">
            {["codigoDetalle","codigoPlan","semana","tema","actividad","recurso","evaluacion"].map(c => (
              <Field key={c} label={c} name={c} value={form[c] || ""} onChange={handleChange} />
            ))}
          </div>
          <div className="flex gap-2 mt-4 justify-end">
            <button onClick={() => setModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">Cancelar</button>
            <button onClick={handleSave} className="px-4 py-2 bg-[#1B2A4A] text-white rounded-lg text-sm hover:bg-[#243660] transition">Guardar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Asistencia ─────────────────────────────────────────────────────────────

function Asistencia() {
  const [lista, setLista] = useState(
    estudiantes.map(e => ({ ...e, estado: "Presente" }))
  );
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ asignatura: "", grupo: "", tema: "", fecha: "", hora: "", aula: "" });
  const toggleEstado = (id) => {
    setLista(lista.map(e => e.idEstudiante === id ? { ...e, estado: e.estado === "Presente" ? "Ausente" : "Presente" } : e));
  };
  return (
    <div>
      <PageHeader title="Registro de Asistencia" subtitle="Control de asistencia por clase" onAdd={() => setModal(true)} />
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[["Asignatura", "asignatura"], ["Grupo", "grupo"], ["Tema", "tema"], ["Fecha", "fecha"], ["Hora", "hora"], ["Aula", "aula"]].map(([label, key]) => (
          <div key={key}>
            <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
            <input type={key === "fecha" ? "date" : "text"} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/30" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">Lista de Estudiantes</p>
          <span className="text-xs text-gray-400">{lista.filter(e => e.estado === "Presente").length} / {lista.length} presentes</span>
        </div>
        <div className="divide-y divide-gray-100">
          {lista.map((est, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1B2A4A] flex items-center justify-center text-white text-xs font-bold">
                  {est.nombre?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{est.nombre} {est.apellido}</p>
                  <p className="text-xs text-gray-400">{est.idEstudiante} · {est.nombrePrograma}</p>
                </div>
              </div>
              <button onClick={() => toggleEstado(est.idEstudiante)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${est.estado === "Presente" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                {est.estado === "Presente" ? <CheckCircle size={13} /> : <XCircle size={13} />}
                {est.estado}
              </button>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-gray-200">
          <button className="w-full bg-[#1B2A4A] text-white rounded-lg py-2 text-sm font-medium hover:bg-[#243660] transition">
            Guardar Asistencia
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Export ─────────────────────────────────────────────────────────────────

export default function DashboardDocente() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/horario" element={<MiHorario />} />
        <Route path="/materias" element={<MisMaterias />} />
        <Route path="/calificaciones" element={<Calificaciones />} />
        <Route path="/plan-microcurriculo" element={<PlanMicrocurriculo />} />
        <Route path="/asistencia" element={<Asistencia />} />
      </Routes>
    </Layout>
  );
}
