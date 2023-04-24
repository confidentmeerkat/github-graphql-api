import RepositoryListItem from "components/repositories/ListItem";
import dayjs from "dayjs";
import { PageInfo, Repository } from "graphql/generated";
import { useUser } from "hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const User: React.FC = () => {
  const { username } = useParams();

  const [pageInfo, setPageInfo] = useState<PageInfo>(); // [hasNextPage, hasPreviousPage]
  const [after, setAfter] = useState<string | null>(null);
  const [before, setBefore] = useState<string | null>(null);

  const { data } = useUser({ login: username || "", after, before });

  useEffect(() => {
    setPageInfo(data?.user?.repositories.pageInfo);
  }, [data]);

  const handleGotoNextPage = () => {
    setAfter(pageInfo?.endCursor || "");
    setBefore("");
  };

  const handleGotoPreviousPage = () => {
    setAfter("");
    setBefore(pageInfo?.startCursor || "");
  };

  return (
    <div className="max-w-screen-lg flex flex-1 mt-8 space-x-8">
      <div className="flex flex-col items-center w-48">
        <img className="h-48 w-48 flex-none rounded-full bg-gray-50" src={data?.user?.avatarUrl} alt="user avatar" />

        <p className="text-2xl mt-2 text-gray-700">{data?.user?.login}</p>

        <p className="text-sm mt-2 text-gray-500">Joined at {dayjs(data?.user?.createdAt).format("MM/DD/YYYY")}</p>

        {!!data?.user?.bio && <p className="mt-4 w-full p-2 text-lg text-gray-700 break-words">{data?.user?.bio}</p>}

        <div className="flex flex-row items-center text-sm text-gray-600 gap-2">
          <span>{data?.user?.followers.totalCount || 0} followers</span>

          <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
            <circle cx={1} cy={1} r={1} />
          </svg>

          <span>{data?.user?.following.totalCount || 0} following</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center">
        <div className="w-full">
          <h6>{data?.user?.repositories.totalCount || 0} Repositories</h6>
        </div>

        <ul role="list" className="divide-y divide-gray-100 w-full">
          {(data?.user?.repositories.nodes || []).map((item) => (
            <RepositoryListItem item={item as Repository} key={item?.nameWithOwner}></RepositoryListItem>
          ))}
        </ul>

        <div className="flex flex-row space-x-6">
          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-white disabled:border disabled:border-gray-500 disabled:text-gray-500"
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
  );
};

export default User;
