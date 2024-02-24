import { useState } from "react";
import "./SearchForm.css";

export const SearchForm = ({ onSearch }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTitle, year);
  };

  return (
    <div className="search-wrapper">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Search for a movie title here.."
          required
        />
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year (optional)"
          pattern="\d{4}"
          title="Year should be a 4-digit number"
        />

        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};
