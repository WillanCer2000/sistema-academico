export const facultades = [
  { id: 1, codigoFacultad: "FAC001", nombreFacultad: "Ingeniería", numeroProgramas: 3 },
  { id: 2, codigoFacultad: "FAC002", nombreFacultad: "Ciencias Económicas", numeroProgramas: 2 },
  { id: 3, codigoFacultad: "FAC003", nombreFacultad: "Ciencias de la Salud", numeroProgramas: 4 },
];

export const programas = [
  { id: 1, codigoPrograma: "PRG001", nombrePrograma: "Ingeniería de Sistemas", numeroCreditos: 160, idCoordinador: 1, idAdministrador: 1 },
  { id: 2, codigoPrograma: "PRG002", nombrePrograma: "Ingeniería Civil", numeroCreditos: 170, idCoordinador: 2, idAdministrador: 1 },
  { id: 3, codigoPrograma: "PRG003", nombrePrograma: "Administración de Empresas", numeroCreditos: 150, idCoordinador: 3, idAdministrador: 1 },
];

export const coordinadores = [
  { id: 1, idCoordinador: "COO001", nombre: "Carlos", apellido: "Martínez", fechaNacimiento: "1980-05-10", sexo: "M", celular: "3001234567", correo: "carlos.martinez@universidad.edu", direccion: "Calle 10 #5-20", ciudad: "Barranquilla", departamento: "Atlántico", pais: "Colombia" },
  { id: 2, idCoordinador: "COO002", nombre: "Laura", apellido: "González", fechaNacimiento: "1978-09-22", sexo: "F", celular: "3009876543", correo: "laura.gonzalez@universidad.edu", direccion: "Carrera 45 #12-30", ciudad: "Bogotá", departamento: "Cundinamarca", pais: "Colombia" },
  { id: 3, idCoordinador: "COO003", nombre: "Pedro", apellido: "Ramírez", fechaNacimiento: "1982-03-15", sexo: "M", celular: "3015551234", correo: "pedro.ramirez@universidad.edu", direccion: "Av. 20 #8-10", ciudad: "Medellín", departamento: "Antioquia", pais: "Colombia" },
];

export const docentes = [
  { id: 1, idDocente: "DOC001", nombre: "Ana", apellido: "Torres", fechaNacimiento: "1985-07-14", sexo: "F", celular: "3002345678", correo: "ana.torres@universidad.edu", direccion: "Calle 50 #30-10", ciudad: "Barranquilla", departamento: "Atlántico", pais: "Colombia" },
  { id: 2, idDocente: "DOC002", nombre: "Jorge", apellido: "Pérez", fechaNacimiento: "1979-11-03", sexo: "M", celular: "3008765432", correo: "jorge.perez@universidad.edu", direccion: "Carrera 8 #22-15", ciudad: "Cali", departamento: "Valle del Cauca", pais: "Colombia" },
  { id: 3, idDocente: "DOC003", nombre: "María", apellido: "López", fechaNacimiento: "1990-02-28", sexo: "F", celular: "3014443322", correo: "maria.lopez@universidad.edu", direccion: "Calle 72 #45-20", ciudad: "Barranquilla", departamento: "Atlántico", pais: "Colombia" },
];

export const estudiantes = [
  { id: 1, idEstudiante: "EST001", tipoDocumento: "CC", fechaExpedicion: "2018-01-15", nombre: "Sofía", apellido: "Hernández", fechaNacimiento: "2000-06-20", sexo: "F", celular: "3011112233", correo: "sofia.hernandez@est.edu", estadoCivil: "Soltero", direccion: "Calle 30 #10-5", ciudad: "Barranquilla", departamento: "Atlántico", pais: "Colombia", puntajeICFES: 320, nombreAcudiente: "Rosa", apellidoAcudiente: "Hernández", celularAcudiente: "3009998877", sisben: "A1", codigoFacultad: "FAC001", nombreFacultad: "Ingeniería", codigoPrograma: "PRG001", nombrePrograma: "Ingeniería de Sistemas" },
  { id: 2, idEstudiante: "EST002", tipoDocumento: "CC", fechaExpedicion: "2019-03-10", nombre: "Diego", apellido: "Castro", fechaNacimiento: "2001-09-12", sexo: "M", celular: "3022223344", correo: "diego.castro@est.edu", estadoCivil: "Soltero", direccion: "Carrera 15 #20-8", ciudad: "Barranquilla", departamento: "Atlántico", pais: "Colombia", puntajeICFES: 298, nombreAcudiente: "Luis", apellidoAcudiente: "Castro", celularAcudiente: "3007776655", sisben: "B2", codigoFacultad: "FAC001", nombreFacultad: "Ingeniería", codigoPrograma: "PRG001", nombrePrograma: "Ingeniería de Sistemas" },
  { id: 3, idEstudiante: "EST003", tipoDocumento: "TI", fechaExpedicion: "2020-07-22", nombre: "Valentina", apellido: "Morales", fechaNacimiento: "2002-12-05", sexo: "F", celular: "3033334455", correo: "valentina.morales@est.edu", estadoCivil: "Soltero", direccion: "Av. Murillo #55-30", ciudad: "Barranquilla", departamento: "Atlántico", pais: "Colombia", puntajeICFES: 350, nombreAcudiente: "Carmen", apellidoAcudiente: "Morales", celularAcudiente: "3006665544", sisben: "A2", codigoFacultad: "FAC002", nombreFacultad: "Ciencias Económicas", codigoPrograma: "PRG003", nombrePrograma: "Administración de Empresas" },
];

export const materias = [
  { id: 1, codigoMateria: "MAT001", nombreMateria: "Cálculo I", numeroCreditos: 4 },
  { id: 2, codigoMateria: "MAT002", nombreMateria: "Programación I", numeroCreditos: 3 },
  { id: 3, codigoMateria: "MAT003", nombreMateria: "Álgebra Lineal", numeroCreditos: 3 },
  { id: 4, codigoMateria: "MAT004", nombreMateria: "Bases de Datos", numeroCreditos: 4 },
  { id: 5, codigoMateria: "MAT005", nombreMateria: "Contabilidad General", numeroCreditos: 3 },
];

export const aulas = [
  { id: 1, codigoAula: "AUL001", nombreAula: "Aula 101", idAdministrador: 1 },
  { id: 2, codigoAula: "AUL002", nombreAula: "Laboratorio Sistemas", idAdministrador: 1 },
  { id: 3, codigoAula: "AUL003", nombreAula: "Aula 205", idAdministrador: 1 },
  { id: 4, codigoAula: "AUL004", nombreAula: "Sala de Conferencias", idAdministrador: 1 },
];

export const microcurriculos = [
  { id: 1, codigoMicrocurriculo: "MIC001", programa: "Ingeniería de Sistemas", nombreMateria: "Cálculo I", numeroCreditos: 4, nivelSuperior: "Domina conceptos avanzados", nivelNormal: "Comprende los fundamentos", nivelBajo: "Conocimiento básico", nivelDeficiente: "No alcanza los mínimos", prerequisitos: "Ninguno", departamentoOferente: "Matemáticas", tipoAsignatura: "Teórica", naturalezaAsignatura: "Obligatoria", descripcionAsignatura: "Fundamentos del cálculo diferencial e integral", objetivoGeneral: "Desarrollar pensamiento matemático analítico", objetivosEspecificos: "Límites, derivadas, integrales", competenciasGenericas: "Pensamiento crítico, resolución de problemas", estrategiasPedagogicas: "Clases magistrales, talleres", referenciasBibliograficas: "Stewart, Cálculo 7ma Ed.", primerParcial: 30, segundoParcial: 30, tercerParcial: 40 },
  { id: 2, codigoMicrocurriculo: "MIC002", programa: "Ingeniería de Sistemas", nombreMateria: "Programación I", numeroCreditos: 3, nivelSuperior: "Desarrolla aplicaciones complejas", nivelNormal: "Programa algoritmos básicos", nivelBajo: "Conoce la sintaxis", nivelDeficiente: "No logra programar", prerequisitos: "Ninguno", departamentoOferente: "Sistemas", tipoAsignatura: "Teórico-Práctica", naturalezaAsignatura: "Obligatoria", descripcionAsignatura: "Introducción a la programación estructurada", objetivoGeneral: "Desarrollar habilidades de programación", objetivosEspecificos: "Variables, ciclos, funciones", competenciasGenericas: "Lógica, abstracción", estrategiasPedagogicas: "Laboratorios, proyectos", referenciasBibliograficas: "Deitel, Cómo programar en C++", primerParcial: 30, segundoParcial: 30, tercerParcial: 40 },
];

export const cargaAcademica = [
  { id: 1, codigoPrograma: "PRG001", nombrePrograma: "Ingeniería de Sistemas", codigoMateria: "MAT001", nombreMateria: "Cálculo I", idDocente: "DOC001", nombreDocente: "Ana Torres", codigoAula: "AUL001", hora: "07:00-09:00", grupo: "A", dia: "Lunes", periodoCarga: "2024-1" },
  { id: 2, codigoPrograma: "PRG001", nombrePrograma: "Ingeniería de Sistemas", codigoMateria: "MAT002", nombreMateria: "Programación I", idDocente: "DOC002", nombreDocente: "Jorge Pérez", codigoAula: "AUL002", hora: "09:00-11:00", grupo: "A", dia: "Martes", periodoCarga: "2024-1" },
  { id: 3, codigoPrograma: "PRG001", nombrePrograma: "Ingeniería de Sistemas", codigoMateria: "MAT003", nombreMateria: "Álgebra Lineal", idDocente: "DOC003", nombreDocente: "María López", codigoAula: "AUL003", hora: "11:00-13:00", grupo: "B", dia: "Miércoles", periodoCarga: "2024-1" },
];

export const horarioDocente = [
  { id: 1, codigoHorario: "HD001", idDocente: "DOC001", nombreDocente: "Ana Torres", nombreAula: "Aula 101", hora: "07:00-09:00", grupo: "A", dia: "Lunes", codigoMateria: "MAT001", nombreMateria: "Cálculo I" },
  { id: 2, codigoHorario: "HD002", idDocente: "DOC001", nombreDocente: "Ana Torres", nombreAula: "Aula 101", hora: "07:00-09:00", grupo: "A", dia: "Miércoles", codigoMateria: "MAT001", nombreMateria: "Cálculo I" },
  { id: 3, codigoHorario: "HD003", idDocente: "DOC002", nombreDocente: "Jorge Pérez", nombreAula: "Laboratorio Sistemas", hora: "09:00-11:00", grupo: "A", dia: "Martes", codigoMateria: "MAT002", nombreMateria: "Programación I" },
];

export const horarioEstudiante = [
  { id: 1, codigoHorario: "HE001", idEstudiante: "EST001", nombreEstudiante: "Sofía Hernández", codigoMateria: "MAT001", nombreMateria: "Cálculo I", nombreAula: "Aula 101", hora: "07:00-09:00", grupo: "A", dia: "Lunes" },
  { id: 2, codigoHorario: "HE002", idEstudiante: "EST001", nombreEstudiante: "Sofía Hernández", codigoMateria: "MAT002", nombreMateria: "Programación I", nombreAula: "Laboratorio Sistemas", hora: "09:00-11:00", grupo: "A", dia: "Martes" },
  { id: 3, codigoHorario: "HE003", idEstudiante: "EST002", nombreEstudiante: "Diego Castro", codigoMateria: "MAT001", nombreMateria: "Cálculo I", nombreAula: "Aula 101", hora: "07:00-09:00", grupo: "A", dia: "Lunes" },
];

export const asistencias = [
  { id: 1, codigoAsistencia: "ASI001", docenteResponsable: "Ana Torres", asignatura: "Cálculo I", codigoAsignatura: "MAT001", grupo: "A", tema: "Límites", fecha: "2024-03-15", sede: "Principal", codigoAula: "AUL001", nombreAula: "Aula 101", hora: "07:00" },
  { id: 2, codigoAsistencia: "ASI002", docenteResponsable: "Jorge Pérez", asignatura: "Programación I", codigoAsignatura: "MAT002", grupo: "A", tema: "Variables y tipos de datos", fecha: "2024-03-16", sede: "Principal", codigoAula: "AUL002", nombreAula: "Laboratorio Sistemas", hora: "09:00" },
];

export const detalleAsistencia = [
  { id: 1, codigoDetalle: "DET001", codigoAsistencia: "ASI001", identificacion: "1001234567", nombre: "Sofía", apellido: "Hernández", correo: "sofia.hernandez@est.edu", curso: "Ingeniería de Sistemas", estado: "Presente" },
  { id: 2, codigoDetalle: "DET002", codigoAsistencia: "ASI001", identificacion: "1002345678", nombre: "Diego", apellido: "Castro", correo: "diego.castro@est.edu", curso: "Ingeniería de Sistemas", estado: "Presente" },
  { id: 3, codigoDetalle: "DET003", codigoAsistencia: "ASI002", identificacion: "1001234567", nombre: "Sofía", apellido: "Hernández", correo: "sofia.hernandez@est.edu", curso: "Ingeniería de Sistemas", estado: "Ausente" },
];

export const sensores = [
  { id: 1, codigoSensor: "SEN001", codigoAula: "AUL001", nombreAula: "Aula 101" },
  { id: 2, codigoSensor: "SEN002", codigoAula: "AUL002", nombreAula: "Laboratorio Sistemas" },
  { id: 3, codigoSensor: "SEN003", codigoAula: "AUL003", nombreAula: "Aula 205" },
];

export const planMicrocurriculo = [
  { id: 1, codigoPlan: "PLN001", codigoMicrocurriculo: "MIC001", nombreDocente: "Ana", apellidoDocente: "Torres", correo: "ana.torres@universidad.edu", programa: "Ingeniería de Sistemas", facultad: "Ingeniería", codigoMateria: "MAT001", materia: "Cálculo I", creditos: 4, tipoAsignatura: "Teórica", naturalezaAsignatura: "Obligatoria", anoLectivo: 2024, periodoAcademico: "2024-1", fechaInicio: "2024-01-15", totalHoras: 64, fechaTerminacion: "2024-05-30" },
];

export const detallePlanMicrocurriculo = [
  { id: 1, codigoDetalle: "DPM001", codigoPlan: "PLN001", semana: 1, tema: "Introducción al Cálculo", actividad: "Clase magistral", recurso: "Tablero, proyector", evaluacion: "Participación" },
  { id: 2, codigoDetalle: "DPM002", codigoPlan: "PLN001", semana: 2, tema: "Límites y continuidad", actividad: "Taller grupal", recurso: "Guías de trabajo", evaluacion: "Taller" },
  { id: 3, codigoDetalle: "DPM003", codigoPlan: "PLN001", semana: 3, tema: "Derivadas", actividad: "Laboratorio", recurso: "Software GeoGebra", evaluacion: "Práctica" },
];

export const contenidoCompetencias = [
  { id: 1, codigoCompetencia: "CC001", codigoMicrocurriculo: "MIC001", unidadTematica: "Unidad 1: Límites", competenciasEspecificas: "Calcula límites de funciones", resultadosAprendizaje: "El estudiante calcula límites correctamente", nivelSuperior: "Calcula con funciones complejas", nivelNormal: "Calcula límites básicos", nivelBajo: "Identifica el concepto", nivelDeficiente: "No comprende el concepto" },
];

export const materiaDocente = [
  { id: 1, codigoMateriaDocente: "MD001", idDocente: "DOC001", nombreDocente: "Ana Torres", codigoMateria: "MAT001", nombreMateria: "Cálculo I" },
  { id: 2, codigoMateriaDocente: "MD002", idDocente: "DOC002", nombreDocente: "Jorge Pérez", codigoMateria: "MAT002", nombreMateria: "Programación I" },
  { id: 3, codigoMateriaDocente: "MD003", idDocente: "DOC003", nombreDocente: "María López", codigoMateria: "MAT003", nombreMateria: "Álgebra Lineal" },
];

export const usuarios = [
  { id: 1, usuario: "admin", password: "admin123", rol: "administrador", nombre: "Super Admin" },
  { id: 2, usuario: "coordinador", password: "coo123", rol: "coordinador", nombre: "Carlos Martínez" },
  { id: 3, usuario: "docente", password: "doc123", rol: "docente", nombre: "Ana Torres" },
  { id: 4, usuario: "estudiante", password: "est123", rol: "estudiante", nombre: "Sofía Hernández" },
];
