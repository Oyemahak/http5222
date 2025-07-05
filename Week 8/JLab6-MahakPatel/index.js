import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import library from "./components/library/library.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up views
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Home page — list all libraries
app.get("/", async (req, res) => {
  const libraries = await library.loadLibraries();
  res.render("index", { title: "Libraries", libraries });
});

// Detail page for each library
app.get("/library/:id", async (req, res) => {
  const branch = await library.getLibraryById(req.params.id);
  res.render("library", { title: "Library Details", branch });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});