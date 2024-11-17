import express from "express";
import Usuario from "../controller/Usuario.js";
import IrrigationCalendar from "../controller/IrrigationCalendar.js";

const router = express.Router();

const usuarioController = new Usuario();
const irrigationCalendarController = new IrrigationCalendar();

// ** Rutas relacionadas con usuarios **
// Crear un nuevo usuario
router.post("/registro", usuarioController.CrearUsuario);

// Iniciar sesión
router.post("/login", usuarioController.LogearUsuario);

// Ruta para cargar el formulario de registro
router.get("/registro", (req, res) => {
  res.render("registro");
});

// Ruta para cargar el formulario de login
router.get("/", (req, res) => {
  res.render("login");
});

// Ruta para el menú principal cuando inicies sesión
router.get("/menuprincipal", (req, res) => {
  res.render("menuprincipal");
});

// ** Rutas relacionadas con IrrigationCalendar **
//ruta para cargar el formulario de riego
router.get("/registro_riego", (req, res) => {
  res.render("irrigation");
});

// Crear un nuevo registro de riego
router.post(
  "/irrigation_calendar/crear",
  irrigationCalendarController.CrearRiego
);

// Listar todos los registros de riego (lectura)
router.get("/irrigation_calendar", irrigationCalendarController.ListarRiegos);

// Actualizar un registro de riego por ID
router.put(
  "/irrigation_calendar/:id",
  irrigationCalendarController.ActualizarRiego
);

// Eliminar un registro de riego por ID
router.delete(
  "/irrigation_calendar/:id",
  irrigationCalendarController.EliminarRiego
);

export default router;
