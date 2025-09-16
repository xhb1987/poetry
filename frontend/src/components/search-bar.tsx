import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  loading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "搜索詩詞、作者或內容...",
  loading = false,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <div className="search-box">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="input input-search chinese-text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          disabled={loading}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !query.trim()}
        >
          {loading ? <div className="loading" /> : "搜索"}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
