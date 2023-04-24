import CategoryList from "components/CategoryList";
import SearchBar from "components/SearchBar";
import RepositoryListItem from "components/repositories/ListItem";
import UserListItem from "components/users/ListItem";
import type { Repository, User } from "graphql/generated";
import { useRepositories, useUsers } from "hooks";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search: React.FC = () => {
  const [search] = useSearchParams();

  const query = useMemo(() => {
    return search.get("q") || "";
  }, [search]);

  const [searchType, setSearchType] = useState("repository");

  const { data: searchReposData, isLoading: isLoadingRepositories } = useRepositories({ query, type: searchType });
  const { data: searchUsersData, isLoading: isLoadingUsers } = useUsers({ query, type: searchType });

  const {
    categories = [],
    users,
    repositories,
  } = useMemo(() => {
    let userCount = 0;
    let repositoryCount = 0;

    if (searchType === "repository") {
      userCount = searchReposData?.search.userCount || 0;
      repositoryCount = searchReposData?.search.repositoryCount || 0;
    } else {
      userCount = searchUsersData?.search.userCount || 0;
      repositoryCount = searchUsersData?.search.repositoryCount || 0;
    }

    const categories = [
      { name: "user", label: "Users", count: userCount },
      { name: "repository", label: "Repositories", count: repositoryCount },
    ];

    return { categories, users: searchUsersData?.search.nodes, repositories: searchReposData?.search.nodes };
  }, [searchReposData, searchUsersData, searchType]);

  return (
    <div className="max-w-screen-lg flex flex-1 flex-col mt-8">
      <SearchBar />

      <div className="flex flex-row space-x-8 mt-3">
        <div className="w-48 p-2 h-fit border rounded-md">
          <CategoryList categories={categories} selected={searchType} onChange={(name) => setSearchType(name)} />
        </div>

        <div className="flex flex-1">
          <ul role="list" className="divide-y divide-gray-100 w-full">
            {searchType === "user"
              ? users?.map((item, index) => <UserListItem item={item as Partial<User>} key={index} />)
              : repositories?.map((item, index) => (
                  <RepositoryListItem item={item as Repository} key={index}></RepositoryListItem>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
