import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const username = value.trim();
    if (!username) return;
    navigate(`/scout/${username}`);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <span className="search-bar__prompt">$ gitscout</span>
      <input
        className="search-bar__input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="octocat"
        aria-label="GitHub username"
        autoFocus
        spellCheck={false}
      />
      {value.length === 0 && <span className="cursor search-bar__cursor" />}
      <button className="search-bar__submit" type="submit">
        run
      </button>
    </form>
  );
}

export default SearchBar;
