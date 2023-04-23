import { useSearchRepositoriesQuery } from "graphql/generated";
import { useRepositories, useUsers } from "hooks";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search: React.FC = () => {
  const [search] = useSearchParams();

  const query = useMemo(() => {
    return search.get("q") || "";
  }, [search]);

  const [searchType, setSearchType] = useState("repository");

  const { data: repositories, isLoading: isLoadingRepositories } = useRepositories({ query, type: searchType });
  console.log("repositories :", repositories);
  const { data: users, isLoading: isLoadingUsers } = useUsers({ query, type: searchType });

  return (
    <div className="container">
      <div>Search</div>
    </div>
  );
};

export default Search;
