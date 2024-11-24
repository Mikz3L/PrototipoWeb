import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRouter from "../backend/routes/index.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.urlencoded({ extended: true }));
app.set("views", join(__dirname, "Views"));
app.set("view engine", "ejs");
app.use(express.static(join(__dirname, "Public")));
app.use("/", indexRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
