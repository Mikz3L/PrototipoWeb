import express from "express";
import usuario from "../controller/Usuario.js";
const router = express.Router();

const usuarioController = new usuario();

router.post("/login", usuarioController.LogearUsuario);

router.post("/registro", usuarioController.CrearUsuario);

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/registro", (req, res) => {
  res.render("registro");
});

router.get("/menuprincipal", (req, res) => {
  res.render("menuprincipal");
});

export default router;
