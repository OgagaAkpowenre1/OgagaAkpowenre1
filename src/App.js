import { useState } from "react";
import Nav from "./components/nav";
import SearchArea from "./components/searchArea";
import MovieList from "./components/movieList";
import Pagination from "./components/pagination";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1e2032c46484753ad74cd1c5f227a788&query=${searchTerm}`
    )
      .then((data) => data.json())
      .then((data) => {
        setMovies(data.results);
        setTotalResults(data.total_results);
        console.log(data);
        console.log(totalResults);
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
        setCurrentPage(numberPages)
        console.log(data);
      });
  }

  const numberPages = Math.floor(totalResults / 20);

  return (
    <div className="App">
      <Nav />
      <SearchArea handleSubmit={handleSubmit} handleChange={handleChange} />
      <MovieList movies={movies} />
      {totalResults > 20 ? (
        <Pagination
          numberPages={numberPages}
          nextPage={nextPage}
          currentPage={currentPage}
        />
      ) : null}
    </div>
  );
}

//1e2032c46484753ad74cd1c5f227a788
export default App;
