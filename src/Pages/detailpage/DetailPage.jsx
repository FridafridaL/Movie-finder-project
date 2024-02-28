import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./DetailPage.css";
import ArrowIcon from "../../assets/arrow.png";
import imdb from "../../assets/imdb.png";

export const DetailPage = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const navigate = useNavigate();
  // Fetches the API key from the .env file
  const api_key = import.meta.env.VITE_OMDB_API_KEY;

  // Function to navigate back to landingpage
  const goBack = () => {
    navigate("/");
  };

  // Fetches Movie details from API when the component mount or the id changes
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${api_key}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  // Displays loading message until moviedetails are fetched
  if (!movieDetails) return <div>Loading...</div>;

  return (
    <div className="detail-wrapper">
      <button onClick={goBack} className="back-button">
        <img src={ArrowIcon} alt="Back" />
      </button>

      <h1>{movieDetails.Title}</h1>

      <div className="under-title-box">
        <img src={imdb} alt="ImDb icon" />
        <p>{movieDetails.imdbRating}</p>|<p>{movieDetails.Runtime}</p>|
        <p>{movieDetails.Language}</p>
        <div className="genres">
          {/* Splits the genres for styling purpuses */}
          {movieDetails.Genre.split(", ").map((genre, index) => (
            <span key={index} className="genre">
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* Additional movie details */}
      <div className="detail-form">
        <p className="plot">{movieDetails.Plot}</p>
        <div className="detail-content">
          <p>
            <strong>Released:</strong> {movieDetails.Released}
          </p>
          <p>
            <strong>Director:</strong> {movieDetails.Director}
          </p>
          <p>
            <strong>Writers:</strong> {movieDetails.Writer}
          </p>
          <p>
            <strong>Actors:</strong> {movieDetails.Actors}
          </p>
        </div>
      </div>
      {movieDetails.Poster && (
        <img
          className="poster-img"
          src={movieDetails.Poster}
          alt={`Poster of ${movieDetails.Title}`}
        />
      )}
    </div>
  );
};
