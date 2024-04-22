import { useState } from "react";
import Nav from "./components/nav";
import SearchArea from "./components/searchArea";
import MovieList from "./components/movieList";
import Pagination from "./components/pagination";
import MovieInfo from "./components/movieInfo";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentMovie, setCurrentMovie] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1e2032c46484753ad74cd1c5f227a788&query=${searchTerm}`
    )
      .then((data) => data.json())
      .then((data) => {
        setMovies(data.results);
        setTotalResults(data.total_results);
        setTotalPages(data.total_pages);
        console.log(totalPages);
        console.log(currentMovie);
      });
  }

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function nextPage(pageNumber) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1e2032c46484753ad74cd1c5f227a788&query=${searchTerm}&page=${pageNumber}`
    )
      .then((data) => data.json())
      .then((data) => {
        setMovies([...data.results]);
        setCurrentPage(pageNumber);
        setTotalPages(data.total_pages);
        console.log(totalPages);
      });
  }

  function viewMovieInfo(id) {
    const filterMovie = movies.filter((movie) => movie.id === id);

    const newCurrentMovie = filterMovie.length > 0 ? filterMovie[0] : null;

    setCurrentMovie(newCurrentMovie);
  }

  function clearCurrentMovie() {
    setCurrentMovie(null);
    console.log(currentMovie)
  }

  return (
    <div className="App">
      <Nav />
      <SearchArea handleSubmit={handleSubmit} handleChange={handleChange} />
      {currentMovie === null ? (
        <div>
          <MovieList movies={movies} viewMovieInfo={viewMovieInfo} />
          {totalResults > 20 ? (
            <Pagination
              numberPages={totalPages}
              nextPage={nextPage}
              currentPage={currentPage}
            />
          ) : null}
        </div>
      ) : <MovieInfo clearMovie={clearCurrentMovie} currentMovie={currentMovie} />}
    </div>
  );
}

//1e2032c46484753ad74cd1c5f227a788
export default App;
