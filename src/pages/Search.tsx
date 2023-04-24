import CategoryList from "components/CategoryList";
import SearchBar from "components/SearchBar";
import RepositoryListItem from "components/repositories/ListItem";
import UserListItem from "components/users/ListItem";
import type { Repository, User } from "graphql/generated";
import { useRepositories, useUsers } from "hooks";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface PageInfo {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  endCursor?: string;
  startCursor?: string;
}

const Search: React.FC = () => {
  const [search] = useSearchParams();

  const query = useMemo(() => {
    return search.get("q") || "";
  }, [search]);

  const [pageInfo, setPageInfo] = useState<PageInfo>(); // [hasNextPage, hasPreviousPage]

  const [searchType, setSearchType] = useState("repository");
  const [after, setAfter] = useState<string | null>(null);
  const [before, setBefore] = useState<string | null>(null);

  const { data: searchReposData } = useRepositories({
    query,
    type: searchType,
    after,
    before,
    count: 10,
  });
  const { data: searchUsersData } = useUsers({
    query,
    type: searchType,
    after,
    before,
    count: 10,
  });

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

      setPageInfo({ ...(searchReposData?.search.pageInfo as PageInfo) });
    } else {
      userCount = searchUsersData?.search.userCount || 0;
      repositoryCount = searchUsersData?.search.repositoryCount || 0;

      setPageInfo({ ...(searchUsersData?.search.pageInfo as PageInfo) });
    }

    const categories = [
      { name: "user", label: "Users", count: userCount },
      { name: "repository", label: "Repositories", count: repositoryCount },
    ];

    return { categories, users: searchUsersData?.search.nodes, repositories: searchReposData?.search.nodes };
  }, [searchReposData, searchUsersData, searchType]);

  const handleGotoNextPage = () => {
    setAfter(pageInfo?.endCursor || "");
    setBefore("");
  };

  const handleGotoPreviousPage = () => {
    setAfter("");
    setBefore(pageInfo?.startCursor || "");
  };

  return (
    <div className="max-w-screen-lg flex flex-1 flex-col mt-8">
      <SearchBar />

      <div className="flex flex-row space-x-8 mt-3">
        <div className="w-48 p-2 h-fit border rounded-md">
          <CategoryList categories={categories} selected={searchType} onChange={(name) => setSearchType(name)} />
        </div>

        <div className="flex flex-1 flex-col items-center">
          <ul role="list" className="divide-y divide-gray-100 w-full">
            {searchType === "user"
              ? users?.map((item, index) => <UserListItem item={item as Partial<User>} key={index} />)
              : repositories?.map((item, index) => (
                  <RepositoryListItem item={item as Repository} key={index}></RepositoryListItem>
                ))}
          </ul>

          <div className="flex flex-row space-x-6">
            <button
              className="rounded-md bg-indigo-600  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-white disabled:border disabled:border-gray-500 disabled:text-gray-500"
              onClick={handleGotoPreviousPage}
              disabled={!pageInfo?.hasPreviousPage}
            >
              Previous
            </button>
            <button
              className="rounded-md bg-indigo-600  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-white disabled:border disabled:border-gray-500 disabled:text-gray-500"
              onClick={handleGotoNextPage}
              disabled={!pageInfo?.hasNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
