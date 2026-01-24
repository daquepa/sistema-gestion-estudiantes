import { gql } from '@apollo/client/core';
import { useQuery, useMutation } from '@apollo/client/react';
import { useState } from 'react';

// 1. Interfaces
interface Estudiante {
  id: string;
  dni: string;
  nombres: string;
  apellidos: string;
  nivel: string;
  curso: string;
  estado: boolean;
  telefono: string;
  fechaInscripcion: string; // Corregido a camelCase
}

interface EstudiantesData {
  estudiantes: Estudiante[];
}

// 2. Query y Mutations
const GET_ESTUDIANTES = gql`
  query GetEstudiantes {
    estudiantes {
      id
      dni
      nombres
      apellidos
      nivel
      curso
      estado
      telefono
      fechaInscripcion # Corregido para Strawberry
    }
  }
`;

const CREAR_ESTUDIANTE = gql`
  mutation CrearEstudiante($dni: String!, $nombres: String!, $apellidos: String!, $nivel: String!, $curso: String!, $telefono: String, $estado: Boolean) {
    crearEstudiante(dni: $dni, nombres: $nombres, apellidos: $apellidos, nivel: $nivel, curso: $curso, telefono: $telefono, estado: $estado) {
      id
    }
  }
`;

const ACTUALIZAR_ESTUDIANTE = gql`
  mutation ActualizarEstudiante($dni: String!, $nombres: String, $apellidos: String, $nivel: String, $curso: String, $telefono: String, $estado: Boolean) {
    actualizarEstudiante(dni: $dni, nombres: $nombres, apellidos: $apellidos, nivel: $nivel, curso: $curso, telefono: $telefono, estado: $estado) {
      id
    }
  }
`;

const ELIMINAR_ESTUDIANTE = gql`
  mutation EliminarEstudiante($dni: String!) {
    eliminarEstudiante(dni: $dni)
  }
`;

export default function App() {
  const { loading, error, data, refetch } = useQuery<EstudiantesData>(GET_ESTUDIANTES);
  const [crearEstudiante] = useMutation(CREAR_ESTUDIANTE);
  const [actualizarEstudiante] = useMutation(ACTUALIZAR_ESTUDIANTE);
  const [eliminarEstudiante] = useMutation(ELIMINAR_ESTUDIANTE);

  const [busqueda, setBusqueda] = useState('');
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ 
    dni: '', nombres: '', apellidos: '', nivel: '', curso: '', telefono: '', estado: true 
  });

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const variables = { ...form };
      if (editando) {
        await actualizarEstudiante({ variables });
      } else {
        await crearEstudiante({ variables });
      }
      resetForm();
      refetch();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleEliminar = async (dni: string) => {
    if (window.confirm("¿Está seguro de eliminar permanentemente a este estudiante?")) {
      await eliminarEstudiante({ variables: { dni } });
      refetch();
    }
  };

  const seleccionarParaEditar = (est: Estudiante) => {
    setEditando(true);
    setForm({ 
      dni: est.dni, 
      nombres: est.nombres, 
      apellidos: est.apellidos, 
      nivel: est.nivel, 
      curso: est.curso, 
      telefono: est.telefono || '', 
      estado: est.estado 
    });
  };

  const resetForm = () => {
    setEditando(false);
    setForm({ dni: '', nombres: '', apellidos: '', nivel: '', curso: '', telefono: '', estado: true });
  };

  const filtrados = data?.estudiantes?.filter(e => 
    e.dni.includes(busqueda) || 
    e.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.apellidos.toLowerCase().includes(busqueda.toLowerCase())
  ) || [];

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-3xl shadow-2xl border-l-8 border-red-500">
        <h2 className="text-red-600 font-black text-xl mb-2">Error de Sincronización</h2>
        <p className="text-slate-600 font-medium">{error.message}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-900">
      {/* Navbar Superior */}
      <header className="bg-slate-900 text-white py-6 shadow-2xl border-b-4 border-indigo-500">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tight">COLEGIO <span className="text-indigo-400">ADMIN</span></h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Panel de Control Académico</p>
          </div>
          <div className="bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700 text-xs font-bold text-indigo-300">
            v2.0 Estudiante Pro
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Columna Izquierda: Formulario */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden sticky top-10">
              <div className={`py-5 px-8 text-white font-black flex justify-between items-center ${editando ? 'bg-amber-500' : 'bg-indigo-600'}`}>
                <span>{editando ? 'EDITAR ESTUDIANTE' : 'NUEVO INGRESO'}</span>
                <span className="text-2xl">{editando ? '📝' : '✨'}</span>
              </div>
              
              <form onSubmit={handleGuardar} className="p-8 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Documento DNI</label>
                  <input className={`w-full p-4 rounded-2xl border-2 transition outline-none ${editando ? 'bg-slate-50 border-slate-200 text-slate-400' : 'border-slate-100 focus:border-indigo-500'}`}
                    placeholder="Ej: 77123456" value={form.dni} onChange={e => setForm({...form, dni: e.target.value})} disabled={editando} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Nombres</label>
                    <input className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none"
                      placeholder="Juan" value={form.nombres} onChange={e => setForm({...form, nombres: e.target.value})} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Apellidos</label>
                    <input className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none"
                      placeholder="Pérez" value={form.apellidos} onChange={e => setForm({...form, apellidos: e.target.value})} required />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2">📞 Teléfono de contacto</label>
                  <input className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none"
                    placeholder="+51 987 654 321" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Nivel</label>
                    <input className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none"
                      placeholder="Primaria" value={form.nivel} onChange={e => setForm({...form, nivel: e.target.value})} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Curso</label>
                    <input className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none"
                      placeholder="6to A" value={form.curso} onChange={e => setForm({...form, curso: e.target.value})} required />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <span className="text-xs font-bold text-slate-600">Estado del alumno</span>
                  <button type="button" onClick={() => setForm({...form, estado: !form.estado})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.estado ? 'bg-green-500' : 'bg-slate-300'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.estado ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <button type="submit" className={`w-full py-4 rounded-2xl font-black text-white shadow-lg transition transform hover:-translate-y-1 active:scale-95 ${editando ? 'bg-amber-500 shadow-amber-200' : 'bg-indigo-600 shadow-indigo-200'}`}>
                  {editando ? 'GUARDAR CAMBIOS' : 'REGISTRAR ESTUDIANTE'}
                </button>
                
                {editando && (
                  <button type="button" onClick={resetForm} className="w-full py-2 text-slate-400 text-[10px] font-black uppercase hover:text-slate-600 tracking-tighter">
                    Cancelar edición
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Columna Derecha: Tabla y Buscador */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">🔍</span>
              <input 
                placeholder="Buscar por DNI, nombres o apellidos..." 
                className="w-full pl-14 pr-6 py-5 bg-white border-none rounded-[2rem] shadow-md focus:ring-4 focus:ring-indigo-100 transition outline-none text-slate-700 font-medium"
                value={busqueda} 
                onChange={e => setBusqueda(e.target.value)} 
              />
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                      <th className="p-8">Estudiante</th>
                      <th className="p-8 text-center">Grado / Nivel</th>
                      <th className="p-8">Contacto y Fecha</th>
                      <th className="p-8 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {loading ? (
                      <tr><td colSpan={4} className="p-24 text-center text-slate-400 font-bold animate-pulse">Sincronizando con base de datos...</td></tr>
                    ) : filtrados.map((est) => (
                      <tr key={est.id} className="hover:bg-indigo-50/30 transition group">
                        <td className="p-8">
                          <div className="font-black text-slate-800 text-lg leading-tight">{est.nombres}</div>
                          <div className="text-slate-500 font-bold mb-1">{est.apellidos}</div>
                          <span className="bg-indigo-100 text-indigo-600 text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">ID: {est.dni}</span>
                        </td>
                        <td className="p-8 text-center">
                          <div className="inline-block px-4 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-black text-xs mb-1">
                            {est.curso}
                          </div>
                          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{est.nivel}</div>
                        </td>
                        <td className="p-8">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                            <span>📞</span> {est.telefono || 'Sin registrar'}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 flex items-center gap-2">
                            <span>📅</span> Inscrito: {new Date(est.fechaInscripcion).toLocaleDateString()}
                          </div>
                          <div className={`mt-2 inline-flex items-center gap-1.5 text-[9px] font-black uppercase ${est.estado ? 'text-green-500' : 'text-red-400'}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${est.estado ? 'bg-green-500' : 'bg-red-400'}`}></span>
                            {est.estado ? 'Alumno Activo' : 'Alumno Inactivo'}
                          </div>
                        </td>
                        <td className="p-8">
                          <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <button onClick={() => seleccionarParaEditar(est)} title="Editar"
                              className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm hover:shadow-indigo-200">
                              ✏️
                            </button>
                            <button onClick={() => handleEliminar(est.dni)} title="Eliminar"
                              className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm hover:shadow-rose-200">
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Total: {filtrados.length} estudiantes</span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                  Conexión en vivo activa
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}