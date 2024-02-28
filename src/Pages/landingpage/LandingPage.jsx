import { useEffect, useState } from "react";
import { SearchForm } from "../../components/SearchForm";
import noImage from "../../assets/no-image.png";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export const LandingPage = () => {
  // State storing moviedata and searchstatus
  const [movies, setMovies] = useState([]);
  const [searchAttempted, setSearchattempted] = useState(false); //If search fails: Movie Not found-message
  const [showSearchWrapper, setShowSearchWrapper] = useState(true);
  // Fetches the API key from the .env file
  const api_key = import.meta.env.VITE_OMDB_API_KEY;

  // This useEffect function loads movies from sessionStorage and updates state when the component mounts.
  useEffect(() => {
    const savedMovies = sessionStorage.getItem("movies");
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
      setSearchattempted(true);
    }
  }, []);

  // Handles movie search and updates with the result
  const handleSearch = (searchTitle, year) => {
    setSearchattempted(true);
    let url = `https://www.omdbapi.com/?s=${encodeURIComponent(
      searchTitle
    )}&apikey=${api_key}`;

    // Appending year if it's provided in the search
    if (year) {
      url += `&y=${year}`;
    }

    // Fetch data from OMDB API and update sessionStorage.
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search || []);
        sessionStorage.setItem("movies", JSON.stringify(data.Search || [])); //Saves search to sessionStorage
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  //  Function for top section to dissapear when scrolling
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowSearchWrapper(currentScrollY < lastScrollY || currentScrollY <= 0);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className="search-wrapper"
        style={{
          transform: showSearchWrapper ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.5s ease",
        }}
      >
        <h1>Movie</h1>
        <h3>Night</h3>
        {/* Imported the SearchForm component and using handleSearch function above */}
        <SearchForm onSearch={handleSearch} />
        {/* <div className="search-wrapper">
        

        
        {/* */}
      </div>

      {/* Container for the searchresult */}
      <div className="movie-result">
        {/* Using a Ternary operator to check if there is a searchattempt. */}
        {searchAttempted ? (
          // Nested ternary operator to check if there is movies in the array. If not, a message is displayed
          movies.length > 0 ? (
            <ul>
              {movies.map((movie) => (
                <li key={movie.imdbID} className="movie-item">
                  <Link to={`/movie/${movie.imdbID}`} className="movie-link">
                    <div className="poster-box">
                      {/* The ternary operator check if the array has a poster and if not, a default image is displayed instead  */}
                      {movie.Poster !== "N/A" ? (
                        <img
                          src={movie.Poster}
                          alt={`Poster for ${movie.Title}`}
                        />
                      ) : (
                        <img src={noImage} alt="Default image" />
                      )}
                    </div>
                    <div className="movie-info">
                      {movie.Title} <br></br>- {movie.Year}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p className="movie-not-found">
                Sorry, there is no movie whith that title. Please try again
              </p>
            </div>
          )
        ) : null}
      </div>
    </>
  );
};
