import "dotenv/config";
import express from "express";
import path from "path";
import db from "./modules/movies/db.js"; // ✅ Update the import if renamed

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 8888;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", async (req, res) => {
  let movieList = await db.getMovies();
  if (!movieList.length) {
    await db.initializeMovies();
    movieList = await db.getMovies();
  }
  res.render("index", { movies: movieList });
});

// Update movie rating (demo: Inception)
app.get("/update", async (req, res) => {
  await db.updateMovieRating("Inception", "R");
  res.redirect("/");
});

// Delete all "R" rated movies
app.get("/delete", async (req, res) => {
  await db.deleteMoviesByRating("R");
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`🟢 App running at http://localhost:${port}`);
});