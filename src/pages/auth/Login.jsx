import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuarios } from "../../data/mockData";
import { GraduationCap, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ usuario: "", password: "", rol: "administrador" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const found = usuarios.find(
      (u) => u.usuario === form.usuario && u.password === form.password && u.rol === form.rol
    );
    if (found) {
      localStorage.setItem("usuario", JSON.stringify(found));
const rutas = {
  administrador: "/admin",
  coordinador: "/coordinador",
  docente: "/docente",
  estudiante: "/estudiante",
};
navigate(rutas[found.rol]);
    } else {
      setError("Usuario, contraseña o rol incorrectos.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-[#1B2A4A] rounded-xl flex items-center justify-center mb-3">
              <GraduationCap size={28} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Sistema Académico</h1>
            <p className="text-sm text-gray-400 mt-1">Ingresa con tus credenciales</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Rol */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
              <select
                value={form.rol}
                onChange={(e) => setForm({ ...form, rol: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/30 focus:border-[#1B2A4A]"
              >
                <option value="administrador">Administrador</option>
                <option value="coordinador">Coordinador</option>
                <option value="docente">Docente</option>
                <option value="estudiante">Estudiante</option>
              </select>
            </div>

            {/* Usuario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
              <input
                type="text"
                placeholder="Ingresa tu usuario"
                value={form.usuario}
                onChange={(e) => setForm({ ...form, usuario: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/30 focus:border-[#1B2A4A]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/30 focus:border-[#1B2A4A] pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-[#1B2A4A] text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-[#243660] transition mt-2"
            >
              Ingresar
            </button>
          </div>

          {/* Hint */}
          <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 font-medium mb-1">Credenciales de prueba:</p>
            <p className="text-xs text-gray-400">Admin: admin / admin123</p>
            <p className="text-xs text-gray-400">Coordinador: coordinador / coo123</p>
            <p className="text-xs text-gray-400">Docente: docente / doc123</p>
            <p className="text-xs text-gray-400">Estudiante: estudiante / est123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
