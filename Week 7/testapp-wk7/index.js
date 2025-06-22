import "dotenv/config";
import express from "express";
import path from "path";

import trakt from "./components/trakt/api.js";

const __dirname = import.meta.dirname;
const app = express();
const port = process.env.PORT || 8888;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Homepage → trending movies
app.get("/", async (req, res) => {
  const trending = await trakt.getTrendingMovies();
  res.render("index", { movies: trending });
});

// Studios page by IMDB ID
app.get("/movie/:imdbId/studios", async (req, res) => {
  const studios = await trakt.getStudiosByMovieId(req.params.imdbId);
  res.render("studios", { studioList: studios });
});

// Anticipated shows
app.get("/anticipated", async (req, res) => {
  const shows = await trakt.getAnticipatedShows();
  res.render("anticipated", { shows });
});

// Show detail page
app.get("/show/:showId", async (req, res) => {
  const show = await trakt.getShowDetails(req.params.showId, true);
  res.render("show", { show });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});