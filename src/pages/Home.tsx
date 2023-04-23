import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate({ pathname: "/search", search: `?q=${search}` });
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="md:w-1/4 sm:2-1/3 w-1/2">
        <div className="min-w-0 flex-1 justify-center mb-4">
          <h2 className="text-xl leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight text-center">
            Search Repositories from Github
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-full border-0 mt-1 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
