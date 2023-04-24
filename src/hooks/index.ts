import { ENDPOINT, GITHUB_APIKEY } from "config";
import { useGetUserQuery, useSearchRepositoriesQuery, useSearchUsersQuery } from "graphql/generated";

export const useRepositories = ({ query, type }: { query: string; type: string }) => {
  return useSearchRepositoriesQuery(
    { endpoint: ENDPOINT, fetchParams: { headers: { Authorization: `Bearer ${GITHUB_APIKEY}` } } },
    { query },
    { enabled: type === "repository" }
  );
};

export const useUsers = ({ query, type }: { query?: string; type: string }) => {
  return useSearchUsersQuery(
    { endpoint: ENDPOINT, fetchParams: { headers: { Authorization: `Bearer ${GITHUB_APIKEY}` } } },
    { query: query || "" },
    { enabled: type === "user" && !!query }
  );
};

export const useUser = (login: string) => {
  return useGetUserQuery(
    {
      endpoint: ENDPOINT,
      fetchParams: { headers: { Authorization: `Bearer ${GITHUB_APIKEY}` } },
    },
    { login },
    { enabled: !!login }
  );
};
