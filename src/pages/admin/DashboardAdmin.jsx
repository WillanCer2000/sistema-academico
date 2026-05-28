import { Routes, Route } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { facultades, programas, coordinadores, docentes, estudiantes, materias, aulas } from "../../data/mockData";
import { useState } from "react";
import { Users, GraduationCap, Building2, School, BookOpen, UserCog, LayoutDashboard, Pencil, Trash2, Plus, X } from "lucide-react";

// ── Componentes reutilizables ──────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function PageHeader({ title, onAdd }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <button onClick={onAdd} className="flex items-center gap-2 bg-[#1B2A4A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#243660] transition">
        <Plus size={16} /> Nuevo
      </button>
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
                {Object.values(row).slice(0, columns.length).map((val, j) => (
                  <td key={j} className="px-4 py-3 text-gray-700">{val}</td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(row)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition"><Pencil size={14} /></button>
                    <button onClick={() => onDelete(row)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition"><Trash2 size={14} /></button>
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
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
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
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Panel de Administración</h2>
        <p className="text-sm text-gray-500 mt-1">Resumen general del sistema académico</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={UserCog} label="Coordinadores" value={coordinadores.length} color="bg-[#1B2A4A]" />
        <StatCard icon={Users} label="Docentes" value={docentes.length} color="bg-blue-500" />
        <StatCard icon={GraduationCap} label="Estudiantes" value={estudiantes.length} color="bg-indigo-500" />
        <StatCard icon={Building2} label="Facultades" value={facultades.length} color="bg-slate-500" />
        <StatCard icon={School} label="Programas" value={programas.length} color="bg-blue-700" />
        <StatCard icon={BookOpen} label="Materias" value={materias.length} color="bg-[#1B2A4A]" />
      </div>
    </div>
  );
}

// ── Módulo Coordinadores ───────────────────────────────────────────────────

function Coordinadores() {
  const [data, setData] = useState(coordinadores);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});

  const campos = ["idCoordinador","nombre","apellido","fechaNacimiento","sexo","celular","correo","direccion","ciudad","departamento","pais"];
  const columnas = ["ID","Nombre","Apellido","F. Nacimiento","Sexo","Celular","Correo","Dirección","Ciudad","Departamento","País"];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAdd = () => { setForm({}); setModal(true); };
  const handleEdit = (row) => { setForm(row); setModal(true); };
  const handleDelete = (row) => setData(data.filter(d => d.idCoordinador !== row.idCoordinador));
  const handleSave = () => {
    if (form.id) setData(data.map(d => d.id === form.id ? form : d));
    else setData([...data, { ...form, id: Date.now() }]);
    setModal(false);
  };

  const tableData = data.map(d => ({ ID: d.idCoordinador, Nombre: d.nombre, Apellido: d.apellido, FechaNac: d.fechaNacimiento, Sexo: d.sexo, Celular: d.celular, Correo: d.correo, Direccion: d.direccion, Ciudad: d.ciudad, Departamento: d.departamento, Pais: d.pais, _raw: d }));

  return (
    <div>
      <PageHeader title="Coordinadores" onAdd={handleAdd} />
      <Table columns={columnas} data={tableData} onEdit={(r) => handleEdit(r._raw)} onDelete={(r) => handleDelete(r._raw)} />
      {modal && (
        <Modal title={form.id ? "Editar Coordinador" : "Nuevo Coordinador"} onClose={() => setModal(false)}>
          <div className="grid grid-cols-2 gap-3">
            {campos.map(c => <Field key={c} label={c} name={c} value={form[c] || ""} onChange={handleChange} options={c === "sexo" ? ["M","F"] : undefined} />)}
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

// ── Módulo Docentes ────────────────────────────────────────────────────────

function Docentes() {
  const [data, setData] = useState(docentes);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});

  const campos = ["idDocente","nombre","apellido","fechaNacimiento","sexo","celular","correo","direccion","ciudad","departamento","pais"];
  const columnas = ["ID","Nombre","Apellido","F. Nacimiento","Sexo","Celular","Correo","Ciudad","Departamento","País"];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    if (form.id) setData(data.map(d => d.id === form.id ? form : d));
    else setData([...data, { ...form, id: Date.now() }]);
    setModal(false);
  };

  const tableData = data.map(d => ({ ID: d.idDocente, Nombre: d.nombre, Apellido: d.apellido, FechaNac: d.fechaNacimiento, Sexo: d.sexo, Celular: d.celular, Correo: d.correo, Ciudad: d.ciudad, Departamento: d.departamento, Pais: d.pais, _raw: d }));

  return (
    <div>
      <PageHeader title="Docentes" onAdd={() => { setForm({}); setModal(true); }} />
      <Table columns={columnas} data={tableData} onEdit={(r) => { setForm(r._raw); setModal(true); }} onDelete={(r) => setData(data.filter(d => d.idDocente !== r._raw.idDocente))} />
      {modal && (
        <Modal title={form.id ? "Editar Docente" : "Nuevo Docente"} onClose={() => setModal(false)}>
          <div className="grid grid-cols-2 gap-3">
            {campos.map(c => <Field key={c} label={c} name={c} value={form[c] || ""} onChange={handleChange} options={c === "sexo" ? ["M","F"] : undefined} />)}
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

// ── Módulo Estudiantes ─────────────────────────────────────────────────────

function Estudiantes() {
  const [data, setData] = useState(estudiantes);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});

  const campos = ["idEstudiante","tipoDocumento","fechaExpedicion","nombre","apellido","fechaNacimiento","sexo","celular","correo","estadoCivil","direccion","ciudad","departamento","pais","puntajeICFES","nombreAcudiente","apellidoAcudiente","celularAcudiente","sisben","codigoFacultad","nombreFacultad","codigoPrograma","nombrePrograma"];
  const columnas = ["ID","Tipo Doc","Nombre","Apellido","Sexo","Celular","Correo","Ciudad","Programa"];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    if (form.id) setData(data.map(d => d.id === form.id ? form : d));
    else setData([...data, { ...form, id: Date.now() }]);
    setModal(false);
  };

  const tableData = data.map(d => ({ ID: d.idEstudiante, TipoDoc: d.tipoDocumento, Nombre: d.nombre, Apellido: d.apellido, Sexo: d.sexo, Celular: d.celular, Correo: d.correo, Ciudad: d.ciudad, Programa: d.nombrePrograma, _raw: d }));

  return (
    <div>
      <PageHeader title="Estudiantes" onAdd={() => { setForm({}); setModal(true); }} />
      <Table columns={columnas} data={tableData} onEdit={(r) => { setForm(r._raw); setModal(true); }} onDelete={(r) => setData(data.filter(d => d.idEstudiante !== r._raw.idEstudiante))} />
      {modal && (
        <Modal title={form.id ? "Editar Estudiante" : "Nuevo Estudiante"} onClose={() => setModal(false)}>
          <div className="grid grid-cols-2 gap-3">
            {campos.map(c => <Field key={c} label={c} name={c} value={form[c] || ""} onChange={handleChange}
              options={c === "sexo" ? ["M","F"] : c === "tipoDocumento" ? ["CC","TI","CE","Pasaporte"] : c === "estadoCivil" ? ["Soltero","Casado","Divorciado","Viudo"] : undefined} />)}
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

// ── Módulo Facultades ──────────────────────────────────────────────────────

function Facultades() {
  const [data, setData] = useState(facultades);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});

  const campos = ["codigoFacultad","nombreFacultad","numeroProgramas"];
  const columnas = ["Código","Nombre Facultad","N° Programas"];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    if (form.id) setData(data.map(d => d.id === form.id ? form : d));
    else setData([...data, { ...form, id: Date.now() }]);
    setModal(false);
  };

  const tableData = data.map(d => ({ Codigo: d.codigoFacultad, Nombre: d.nombreFacultad, NPrograms: d.numeroProgramas, _raw: d }));

  return (
    <div>
      <PageHeader title="Facultades" onAdd={() => { setForm({}); setModal(true); }} />
      <Table columns={columnas} data={tableData} onEdit={(r) => { setForm(r._raw); setModal(true); }} onDelete={(r) => setData(data.filter(d => d.codigoFacultad !== r._raw.codigoFacultad))} />
      {modal && (
        <Modal title={form.id ? "Editar Facultad" : "Nueva Facultad"} onClose={() => setModal(false)}>
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

// ── Módulo Programas ───────────────────────────────────────────────────────

function Programas() {
  const [data, setData] = useState(programas);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});

  const campos = ["codigoPrograma","nombrePrograma","numeroCreditos","idCoordinador","idAdministrador"];
  const columnas = ["Código","Nombre Programa","N° Créditos","ID Coordinador","ID Admin"];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    if (form.id) setData(data.map(d => d.id === form.id ? form : d));
    else setData([...data, { ...form, id: Date.now() }]);
    setModal(false);
  };

  const tableData = data.map(d => ({ Codigo: d.codigoPrograma, Nombre: d.nombrePrograma, Creditos: d.numeroCreditos, IdCoo: d.idCoordinador, IdAdmin: d.idAdministrador, _raw: d }));

  return (
    <div>
      <PageHeader title="Programas" onAdd={() => { setForm({}); setModal(true); }} />
      <Table columns={columnas} data={tableData} onEdit={(r) => { setForm(r._raw); setModal(true); }} onDelete={(r) => setData(data.filter(d => d.codigoPrograma !== r._raw.codigoPrograma))} />
      {modal && (
        <Modal title={form.id ? "Editar Programa" : "Nuevo Programa"} onClose={() => setModal(false)}>
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

// ── Módulo Aulas ───────────────────────────────────────────────────────────

function Aulas() {
  const [data, setData] = useState(aulas);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});

  const campos = ["codigoAula","nombreAula","idAdministrador"];
  const columnas = ["Código","Nombre Aula","ID Admin"];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    if (form.id) setData(data.map(d => d.id === form.id ? form : d));
    else setData([...data, { ...form, id: Date.now() }]);
    setModal(false);
  };

  const tableData = data.map(d => ({ Codigo: d.codigoAula, Nombre: d.nombreAula, IdAdmin: d.idAdministrador, _raw: d }));

  return (
    <div>
      <PageHeader title="Aulas" onAdd={() => { setForm({}); setModal(true); }} />
      <Table columns={columnas} data={tableData} onEdit={(r) => { setForm(r._raw); setModal(true); }} onDelete={(r) => setData(data.filter(d => d.codigoAula !== r._raw.codigoAula))} />
      {modal && (
        <Modal title={form.id ? "Editar Aula" : "Nueva Aula"} onClose={() => setModal(false)}>
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

// ── Módulo Materias ────────────────────────────────────────────────────────

function Materias() {
  const [data, setData] = useState(materias);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});

  const campos = ["codigoMateria","nombreMateria","numeroCreditos"];
  const columnas = ["Código","Nombre Materia","N° Créditos"];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    if (form.id) setData(data.map(d => d.id === form.id ? form : d));
    else setData([...data, { ...form, id: Date.now() }]);
    setModal(false);
  };

  const tableData = data.map(d => ({ Codigo: d.codigoMateria, Nombre: d.nombreMateria, Creditos: d.numeroCreditos, _raw: d }));

  return (
    <div>
      <PageHeader title="Materias" onAdd={() => { setForm({}); setModal(true); }} />
      <Table columns={columnas} data={tableData} onEdit={(r) => { setForm(r._raw); setModal(true); }} onDelete={(r) => setData(data.filter(d => d.codigoMateria !== r._raw.codigoMateria))} />
      {modal && (
        <Modal title={form.id ? "Editar Materia" : "Nueva Materia"} onClose={() => setModal(false)}>
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

// ── Dashboard Principal ────────────────────────────────────────────────────

export default function DashboardAdmin() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/coordinadores" element={<Coordinadores />} />
        <Route path="/docentes" element={<Docentes />} />
        <Route path="/estudiantes" element={<Estudiantes />} />
        <Route path="/facultades" element={<Facultades />} />
        <Route path="/programas" element={<Programas />} />
        <Route path="/aulas" element={<Aulas />} />
        <Route path="/materias" element={<Materias />} />
      </Routes>
    </Layout>
  );
}
