import { useEffect, useState } from "react";
import { SearchForm } from "../../components/SearchForm";
import noImage from "../../assets/no-image.png";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export const LandingPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchAttempted, setSearchattempted] = useState(false); //If search fails: Movie Not found-message
  const api_key = import.meta.env.VITE_OMDB_API_KEY;

  // This useEffect function loads movies from sessionStorage and updates state when the component mounts.
  useEffect(() => {
    const savedMovies = sessionStorage.getItem("movies");
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
      setSearchattempted(true);
    }
  }, []);

  // Using useLocation in this useEffect function to navigate back from DetailPage and not loose the data from last search but still be able to refresh and clear the browser
  //   useEffect(() => {
  //     if (location.state?.navigatedBack) {
  //       const savedMovies = sessionStorage.getItem("movies");
  //       if (savedMovies) {
  //         setSearchattempted(true);
  //       }
  //     } else {
  //       sessionStorage.removeItem("movies"); // Clear the movies if not navigated back
  //       //   setMovies([]); // Optional: Clear movies state if you want to start fresh
  //       setSearchattempted(false);
  //     }
  //   }, [location]);

  //   useEffect(() => {
  //     const savedMovies = sessionStorage.getItem("movies");
  //     if (savedMovies) {
  //       setMovies(JSON.parse(savedMovies));
  //       setSearchattempted(true);
  //     }
  //   }, []);

  const handleSearch = (searchTitle, year) => {
    setSearchattempted(true);
    let url = `https://www.omdbapi.com/?s=${encodeURIComponent(
      searchTitle
    )}&apikey=${api_key}`;

    if (year) {
      url += `&y=${year}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search || []);
        sessionStorage.setItem("movies", JSON.stringify(data.Search || [])); //Saves search to sessionStorage
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div className="main-wrapper">
      <h1>Movie Night</h1>
      <div className="search-wrapper">
        <SearchForm onSearch={handleSearch} />
      </div>

      <div className="movie-result">
        {searchAttempted ? (
          movies.length > 0 ? (
            <ul>
              {movies.map((movie) => (
                <li key={movie.imdbID}>
                  <Link to={`/movie/${movie.imdbID}`} className="movie-link">
                    {movie.Title} - {movie.Year}
                    <div className="poster-box">
                      {movie.Poster !== "N/A" ? (
                        <img
                          src={movie.Poster}
                          alt={`Poster for ${movie.Title}`}
                        />
                      ) : (
                        <img src={noImage} alt="Default image" />
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>Movie not found</div>
          )
        ) : (
          <div>Search for movies...</div>
        )}
      </div>
    </div>
  );
};

// fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${api_key}`)
