import express from "express";
import Usuario from "../controller/Usuario.js";
import IrrigationCalendar from "../controller/IrrigationCalendar.js";
import EmailService from "../controller/Notificaciones.js";

const servicioNotificaciones = new EmailService();
// servicioNotificaciones.sendEmail("Hola","Hola"); es un ejemplo para que sepan usarlo...

const router = express.Router();

const usuarioController = new Usuario();
const irrigationCalendarController = new IrrigationCalendar(servicioNotificaciones);

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

router.get("/programar_riego", (req, res) => {
  const id_user = 1; // Puedes obtener esto de la sesión o base de datos
  res.render("programar", { id_user });
});

router.get("/historial_condiciones", (req, res) => {
  res.render("historial");
});

router.get("/configuracion_sensores", (req, res) => {
  res.render("configuracion");
});

// ** Rutas relacionadas con IrrigationCalendar **
// Ruta para cargar el formulario de riego
router.get("/registro_riego", (req, res) => {
  res.render("calendario");
});

// Crear un nuevo registro de riego
router.post("/irrigation_calendar", irrigationCalendarController.CrearRiego);

// Listar todos los registros de riego (lectura)
router.get("/registro_riego", irrigationCalendarController.ListarRiegos);

// Actualizar un registro de riego por ID
router.put("/irrigation_calendar/:id", irrigationCalendarController.ActualizarRiego);

// Eliminar un registro de riego por ID
router.delete("/irrigation_calendar/:id", irrigationCalendarController.EliminarRiego);

export default router;
