import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    nav(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        placeholder="Fill your order number#"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
    </form>
  );
}

export default SearchOrder;
