import { useState } from "react";
import "./SearchForm.css";

export const SearchForm = ({ onSearch }) => {
  // States handeling the inputs with title and year
  const [searchTitle, setSearchTitle] = useState("");
  const [year, setYear] = useState("");

  // Function that's called when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTitle, year);
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <div className="inputs-row">
          <input
            className="input-title"
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="Search for a movie title here.."
            required
          />
          <input
            className="input-year"
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year (optional)"
            pattern="\d{4}"
            title="Year should be a 4-digit number"
          />
        </div>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};
