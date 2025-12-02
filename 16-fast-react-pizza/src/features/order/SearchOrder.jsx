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
        className="w-56 rounded-full bg-yellow-100 px-2 py-4 text-sm transition-transform duration-300 placeholder:text-stone-600 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50 focus:ring-offset-2 sm:focus:w-64"
      ></input>
    </form>
  );
}

export default SearchOrder;
