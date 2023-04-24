import { EventHandler, FormEventHandler, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [params, setParams] = useSearchParams();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setParams(`q=${search}`);
  };

  return (
    <div className="flex flex-row justify-between border-b py-2 align-center">
      <h6 className="text-xl font-semibold">Search</h6>

      <form onSubmit={handleSubmit}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full rounded-full border-0 mt-1 px-4 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </form>
    </div>
  );
};

export default SearchBar;
