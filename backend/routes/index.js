import express from 'express';
import { CrearUsuario, LogearUsuario } from '../controller/index.js';
const router = express.Router();

router.post('/login', LogearUsuario);

router.post('/registro', CrearUsuario);

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
