import express from "express";
import { CrearUsuario, LogearUsuario } from "../controller/index.js";
import usuario from "../controller/Usuario.js";
const router = express.Router();

const usuario = new usuario();

router.post("/login", usuario.LogearUsuario);

router.post("/registro", usuario.CrearUsuario);

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
