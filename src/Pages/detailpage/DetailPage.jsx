import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./DetailPage.css";

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
      <button onClick={goBack}>Back to Home</button>
      {/* <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "blue",
          marginBottom: "20px",
          display: "block",
        }}
      >
        Back to Home
      </Link> */}
      <h1>{movieDetails.Title}</h1>
      <p>{movieDetails.Plot}</p>
      {movieDetails.Poster && (
        <img
          src={movieDetails.Poster}
          alt={`Poster of ${movieDetails.Title}`}
        />
      )}
    </div>
  );
};
