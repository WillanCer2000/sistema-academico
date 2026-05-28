import { Routes, Route } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import {
  cargaAcademica, horarioDocente, horarioEstudiante,
  microcurriculos, planMicrocurriculo, detallePlanMicrocurriculo
} from "../../data/mockData";
import { ClipboardList, Calendar, BookMarked, Layers, BarChart2, Plus, Pencil, Trash2, X } from "lucide-react";

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
                    <button onClick={() => onEdit && onEdit(row)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition"><Pencil size={14} /></button>
                    <button onClick={() => onDelete && onDelete(row)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition"><Trash2 size={14} /></button>
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

function Field({ label, name, value, onChange, type = "text", options, span }) {
  return (
    <div className={span ? "col-span-2" : ""}>
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
    { icon: ClipboardList, label: "Cargas Académicas", value: cargaAcademica.length, color: "bg-[#1B2A4A]" },
    { icon: BookMarked, label: "Microcurrículos", value: microcurriculos.length, color: "bg-blue-500" },
    { icon: Layers, label: "Planes Microcurrículo", value: planMicrocurriculo.length, color: "bg-indigo-500" },
    { icon: Calendar, label: "Horarios Docente", value: horarioDocente.length, color: "bg-slate-500" },
  ];
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Panel del Coordinador</h2>
        <p className="text-sm text-gray-500 mt-1">Gestión académica del programa</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
    </div>
  );
}

// ── Carga Académica ────────────────────────────────────────────────────────

function CargaAcademica() {
  const [data, setData] = useState(cargaAcademica);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    if (form.id) setData(data.map(d => d.id === form.id ? form : d));
    else setData([...data, { ...form, id: Date.now() }]);
    setModal(false);
  };
  const cols = ["Programa", "Materia", "Docente", "Aula", "Hora", "Día", "Grupo", "Período"];
  const tableData = data.map(d => ({ Programa: d.nombrePrograma, Materia: d.nombreMateria, Docente: d.nombreDocente, Aula: d.codigoAula, Hora: d.hora, Dia: d.dia, Grupo: d.grupo, Periodo: d.periodoCarga, _raw: d }));
  return (
    <div>
      <PageHeader title="Carga Académica" subtitle="Asignación de materias por programa" onAdd={() => { setForm({}); setModal(true); }} />
      <Table columns={cols} data={tableData} onEdit={(r) => { setForm(r._raw); setModal(true); }} onDelete={(r) => setData(data.filter(d => d.id !== r._raw.id))} />
      {modal && (
        <Modal title="Carga Académica" onClose={() => setModal(false)}>
          <div className="grid grid-cols-2 gap-3">
            {["codigoPrograma","nombrePrograma","codigoMateria","nombreMateria","idDocente","nombreDocente","codigoAula","hora","grupo","dia","periodoCarga"].map(c => (
              <Field key={c} label={c} name={c} value={form[c] || ""} onChange={handleChange}
                options={c === "dia" ? ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"] : undefined} />
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

// ── Horario Docente ────────────────────────────────────────────────────────

function HorarioDocente() {
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const horas = ["07:00-09:00", "09:00-11:00", "11:00-13:00", "14:00-16:00", "16:00-18:00"];
  return (
    <div>
      <PageHeader title="Horario Docente" subtitle="Vista semanal de clases por docente" />
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

// ── Horario Estudiante ─────────────────────────────────────────────────────

function HorarioEstudiante() {
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const horas = ["07:00-09:00", "09:00-11:00", "11:00-13:00", "14:00-16:00", "16:00-18:00"];
  return (
    <div>
      <PageHeader title="Horario Estudiante" subtitle="Vista semanal de clases por estudiante" />
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
                    const clase = horarioEstudiante.find(h => h.hora === hora && h.dia === dia);
                    return (
                      <td key={dia} className="px-2 py-2 text-center">
                        {clase ? (
                          <div className="bg-indigo-600 text-white rounded-lg px-2 py-1.5 text-xs">
                            <p className="font-semibold">{clase.nombreMateria}</p>
                            <p className="text-indigo-200">{clase.nombreAula}</p>
                            <p className="text-indigo-300">{clase.nombreEstudiante}</p>
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

// ── Microcurrículo ─────────────────────────────────────────────────────────

function Microcurriculo() {
  const [data, setData] = useState(microcurriculos);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    if (form.id) setData(data.map(d => d.id === form.id ? form : d));
    else setData([...data, { ...form, id: Date.now() }]);
    setModal(false);
  };
  const cols = ["Código", "Programa", "Materia", "Créditos", "Tipo", "Naturaleza"];
  const tableData = data.map(d => ({ Codigo: d.codigoMicrocurriculo, Programa: d.programa, Materia: d.nombreMateria, Creditos: d.numeroCreditos, Tipo: d.tipoAsignatura, Naturaleza: d.naturalezaAsignatura, _raw: d }));
  const campos = ["codigoMicrocurriculo","programa","nombreMateria","numeroCreditos","nivelSuperior","nivelNormal","nivelBajo","nivelDeficiente","prerequisitos","departamentoOferente","tipoAsignatura","naturalezaAsignatura","descripcionAsignatura","objetivoGeneral","objetivosEspecificos","competenciasGenericas","estrategiasPedagogicas","referenciasBibliograficas","primerParcial","segundoParcial","tercerParcial"];
  return (
    <div>
      <PageHeader title="Microcurrículo" subtitle="Contenido programático de asignaturas" onAdd={() => { setForm({}); setModal(true); }} />
      <Table columns={cols} data={tableData} onEdit={(r) => { setForm(r._raw); setModal(true); }} onDelete={(r) => setData(data.filter(d => d.id !== r._raw.id))} />
      {modal && (
        <Modal title="Microcurrículo" onClose={() => setModal(false)}>
          <div className="grid grid-cols-2 gap-3">
            {campos.map(c => (
              <Field key={c} label={c} name={c} value={form[c] || ""} onChange={handleChange}
                options={c === "tipoAsignatura" ? ["Teórica","Práctica","Teórico-Práctica"] : c === "naturalezaAsignatura" ? ["Obligatoria","Electiva"] : undefined}
                span={["descripcionAsignatura","objetivoGeneral","objetivosEspecificos","competenciasGenericas","estrategiasPedagogicas","referenciasBibliograficas"].includes(c)} />
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

// ── Plan Microcurrículo ────────────────────────────────────────────────────

function PlanMicrocurriculo() {
  const [data, setData] = useState(planMicrocurriculo);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    if (form.id) setData(data.map(d => d.id === form.id ? form : d));
    else setData([...data, { ...form, id: Date.now() }]);
    setModal(false);
  };
  const cols = ["Código", "Microcurrículo", "Docente", "Materia", "Período", "Inicio", "Fin"];
  const tableData = data.map(d => ({ Codigo: d.codigoPlan, Micro: d.codigoMicrocurriculo, Docente: `${d.nombreDocente} ${d.apellidoDocente}`, Materia: d.materia, Periodo: d.periodoAcademico, Inicio: d.fechaInicio, Fin: d.fechaTerminacion, _raw: d }));
  const campos = ["codigoPlan","codigoMicrocurriculo","nombreDocente","apellidoDocente","correo","programa","facultad","codigoMateria","materia","creditos","tipoAsignatura","naturalezaAsignatura","anoLectivo","periodoAcademico","fechaInicio","totalHoras","fechaTerminacion"];
  return (
    <div>
      <PageHeader title="Plan Microcurrículo" subtitle="Planificación por período académico" onAdd={() => { setForm({}); setModal(true); }} />
      <Table columns={cols} data={tableData} onEdit={(r) => { setForm(r._raw); setModal(true); }} onDelete={(r) => setData(data.filter(d => d.id !== r._raw.id))} />
      {modal && (
        <Modal title="Plan Microcurrículo" onClose={() => setModal(false)}>
          <div className="grid grid-cols-2 gap-3">
            {campos.map(c => <Field key={c} label={c} name={c} value={form[c] || ""} onChange={handleChange} />)}
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

// ── Seguimiento ────────────────────────────────────────────────────────────

function Seguimiento() {
  return (
    <div>
      <PageHeader title="Seguimiento Microcurrículo" subtitle="Estado de avance por asignatura" />
      <div className="grid grid-cols-1 gap-4">
        {microcurriculos.map((m, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">{m.nombreMateria}</h3>
                <p className="text-sm text-gray-500">{m.programa} · {m.tipoAsignatura}</p>
              </div>
              <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100">Activo</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {[["1er Parcial", m.primerParcial], ["2do Parcial", m.segundoParcial], ["3er Parcial", m.tercerParcial]].map(([label, val]) => (
                <div key={label} className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
                  <p className="text-lg font-bold text-[#1B2A4A]">{val}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-[#1B2A4A] h-1.5 rounded-full" style={{ width: `${val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Export ─────────────────────────────────────────────────────────────────

export default function DashboardCoordinador() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/carga-academica" element={<CargaAcademica />} />
        <Route path="/horario-docente" element={<HorarioDocente />} />
        <Route path="/horario-estudiante" element={<HorarioEstudiante />} />
        <Route path="/microcurriculo" element={<Microcurriculo />} />
        <Route path="/plan-microcurriculo" element={<PlanMicrocurriculo />} />
        <Route path="/seguimiento" element={<Seguimiento />} />
      </Routes>
    </Layout>
  );
}
