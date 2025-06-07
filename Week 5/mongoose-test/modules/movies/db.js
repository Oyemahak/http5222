import mongoose from "mongoose";

const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;

// Schema and Model
const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: String
});

const Movie = mongoose.model("Movie", MovieSchema);

await mongoose.connect(dbUrl);

// Get all movies
async function getMovies() {
  return await Movie.find({});
}

// Insert at least two movies
async function initializeMovies() {
  const movies = [
    { title: "Inception", year: 2010, rating: "PG-13" },
    { title: "Toy Story", year: 1995, rating: "G" }
  ];
  await Movie.insertMany(movies);
}

// Update rating by title
async function updateMovieRating(title, newRating) {
  await Movie.updateOne({ title }, { $set: { rating: newRating } });
}

// Delete movies by rating
async function deleteMoviesByRating(rating) {
  await Movie.deleteMany({ rating });
}

export default {
  getMovies,
  initializeMovies,
  updateMovieRating,
  deleteMoviesByRating
};