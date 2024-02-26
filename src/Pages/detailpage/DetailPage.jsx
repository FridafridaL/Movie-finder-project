import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./DetailPage.css";
import ArrowIcon from "../../assets/arrow.png";

export const DetailPage = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const navigate = useNavigate();
  const api_key = import.meta.env.VITE_OMDB_API_KEY;

  // To navigate back to Landingpage using useNavigate, navigate(-1) or navigate("/")
  const goBack = () => {
    navigate("/");
  };

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${api_key}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  if (!movieDetails) return <div>Loading...</div>;

  return (
    <div className="detail-wrapper">
      <button onClick={goBack} className="back-button">
        <img src={ArrowIcon} alt="Back" />
      </button>

      <h1>{movieDetails.Title}</h1>
      <p className="plot">{movieDetails.Plot}</p>
      {movieDetails.Poster && (
        <img
          className="poster-img"
          src={movieDetails.Poster}
          alt={`Poster of ${movieDetails.Title}`}
        />
      )}
      {/* Additional movie details */}
      <div className="detail-form">
        <p>
          <strong>Released:</strong> {movieDetails.Released}
        </p>
        <p>
          <strong>Runtime:</strong> {movieDetails.Runtime}
        </p>
        <p>
          <strong>Genre:</strong> {movieDetails.Genre}
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
        <p>
          <strong>Language:</strong> {movieDetails.Language}
        </p>
        <p>
          <strong>IMDb Rating:</strong> {movieDetails.imdbRating}
        </p>
      </div>
    </div>
  );
};
