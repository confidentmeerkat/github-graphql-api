import { ENDPOINT, GITHUB_APIKEY } from "config";
import { useGetUserQuery, useSearchRepositoriesQuery, useSearchUsersQuery } from "graphql/generated";

interface PaginationProps {
  after?: string | null;
  before?: string | null;
  count?: number;
}

export const useRepositories = ({
  query = "",
  type,
  after,
  before,
  count = 10,
}: { query: string; type: string } & PaginationProps) => {
  return useSearchRepositoriesQuery(
    { endpoint: ENDPOINT, fetchParams: { headers: { Authorization: `Bearer ${GITHUB_APIKEY}` } } },
    { query, ...(!!before ? { before, last: count } : { after, first: count }) },
    { enabled: type === "repository" }
  );
};

export const useUsers = ({
  query = "",
  type,
  after,
  before,
  count = 10,
}: { query?: string; type: string } & PaginationProps) => {
  return useSearchUsersQuery(
    { endpoint: ENDPOINT, fetchParams: { headers: { Authorization: `Bearer ${GITHUB_APIKEY}` } } },
    { query, ...(!!before ? { before, last: count } : { after, first: count }) },
    { enabled: type === "user" && !!query }
  );
};

export const useUser = ({ login, after, before, count = 10 }: { login: string } & PaginationProps) => {
  return useGetUserQuery(
    {
      endpoint: ENDPOINT,
      fetchParams: { headers: { Authorization: `Bearer ${GITHUB_APIKEY}` } },
    },
    { login, ...(!!before ? { before, last: count } : { after, first: count }) },
    { enabled: !!login }
  );
};
