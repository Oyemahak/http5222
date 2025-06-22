const baseUrl = "https://api.trakt.tv";

const headers = {
  "Content-Type": "application/json",
  "trakt-api-version": "2",
  "trakt-api-key": process.env.TRAKT_CLIENT_ID,
};

async function getTrendingMovies() {
  const url = `${baseUrl}/movies/trending?limit=15&extended=images`;
  const response = await fetch(url, { headers });
  return await response.json();
}

async function getStudiosByMovieId(imdbId) {
  const url = `${baseUrl}/movies/${imdbId}/studios`;
  const response = await fetch(url, { headers });
  return await response.json();
}

async function getAnticipatedShows() {
  const url = `${baseUrl}/shows/anticipated`;
  const response = await fetch(url, { headers });
  return await response.json();
}

async function getShowDetails(showId, extended = true) {
  const url = `${baseUrl}/shows/${showId}${extended ? "?extended=full" : ""}`;
  const response = await fetch(url, { headers });
  return await response.json();
}

export default {
  getTrendingMovies,
  getStudiosByMovieId,
  getAnticipatedShows,
  getShowDetails,
};