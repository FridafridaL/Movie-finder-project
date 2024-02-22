import { useEffect, useState } from "react";
import { SearchForm } from "../components/SearchForm";

export const LandingPage = () => {
  const [movie, setMovie] = useState({});
  const api_key = import.meta.env.VITE_OMDB_API_KEY;

  const handleSearch = (query) => {
    // Use the query in the API call
    const url = `http://www.omdbapi.com/?s=${encodeURIComponent(
      query
    )}&apikey=${api_key}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data); // Assuming 'data' is the object you want to set
        console.log(data); // Logging the data to see the result
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div>
      <h1>Movies</h1>
      <SearchForm onSearch={handleSearch} />
      {/* Optionally, display the movie information here */}
    </div>
  );
};

// fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${api_key}`)
