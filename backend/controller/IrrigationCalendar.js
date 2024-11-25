import db from "../database/DBconexion.js";
import EmailService from "./Notificaciones.js";

class IrrigationCalendar {
  constructor() {}

  // Crear Riego
  CrearRiego(req, res) {
    const servicioNotificaciones = new EmailService();
    const { id_user, irrigation_day, irrigation_hour } = req.body;

    const query =
      "INSERT INTO irrigation_calendar (id_user, irrigation_day, irrigation_hour) VALUES (?, ?, ?)";
    
    db.query(query, [id_user, irrigation_day, irrigation_hour], (err, result) => {
      if (err) {
        console.error("Error al registrar riego:", err);
        res.status(500).render("programar", { 
          id_user, 
          message: "Hubo un error al registrar el riego. Inténtalo nuevamente." 
        });
        servicioNotificaciones.sendEmail(
          "Error en Registro de Riego",
          `Hubo un error al registrar el riego para el usuario ${id_user}.`
        );
        return;
      }
      
      res.render("programar", { 
        id_user, 
        message: "El riego ha sido registrado exitosamente." 
      });

      servicioNotificaciones.sendEmail(
        "Riego Registrado",
        `El riego para el usuario ${id_user} ha sido registrado exitosamente para el día ${irrigation_day} a las ${irrigation_hour}.`
      );
    });
  }

  // Listar Riegos
  ListarRiegos(req, res) {
    const query = "SELECT * FROM irrigation_calendar";
    
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error al listar riegos:", err);
        res.status(500).send("Hubo un error al obtener la lista de riegos.");
        return;
      }
      
      if (results.length === 0) {
        res.status(404).send("No hay riegos registrados.");
      } else {
        res.status(200).json(results);
      }
    });
  }

  // Actualizar Riego
  ActualizarRiego(req, res) {
    const { id } = req.params;
    const { irrigation_day, irrigation_hour } = req.body;

    const query =
      "UPDATE irrigation_calendar SET irrigation_day = ?, irrigation_hour = ? WHERE id_calendar = ?";
    
    db.query(query, [irrigation_day, irrigation_hour, id], (err, result) => {
      if (err) {
        console.error("Error al actualizar riego:", err);
        res.status(500).send("Hubo un error al actualizar el riego. Inténtalo nuevamente.");
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).send("No se encontró el riego para actualizar.");
      } else {
        res.send("El riego ha sido actualizado exitosamente.");
        
        const servicioNotificaciones = new EmailService();
        servicioNotificaciones.sendEmail(
          "Riego Actualizado",
          `El riego con ID ${id} ha sido actualizado a ${irrigation_day} a las ${irrigation_hour}.`
        );
      }
    });
  }

  // Eliminar Riego
  EliminarRiego(req, res) {
    const { id } = req.params;
    const query = "DELETE FROM irrigation_calendar WHERE id_calendar = ?";
    
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al eliminar riego:", err);
        res.status(500).send("Hubo un error al eliminar el riego.");
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).send("No se encontró el riego para eliminar.");
      } else {
        res.send("El riego ha sido eliminado exitosamente.");
        
        const servicioNotificaciones = new EmailService();
        servicioNotificaciones.sendEmail(
          "Riego Eliminado",
          `El riego con ID ${id} ha sido eliminado correctamente.`
        );
      }
    });
  }
}

export default IrrigationCalendar;
