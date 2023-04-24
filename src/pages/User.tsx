import RepositoryListItem from "components/repositories/ListItem";
import dayjs from "dayjs";
import { Repository } from "graphql/generated";
import { useUser } from "hooks";
import { useParams } from "react-router-dom";

const User: React.FC = () => {
  const { username } = useParams();

  const { data } = useUser(username || "");

  return (
    <div className="max-w-screen-lg flex flex-1 mt-8 space-x-8">
      <div className="flex flex-col items-center">
        <img className="h-48 w-48 flex-none rounded-full bg-gray-50" src={data?.user?.avatarUrl} alt="user avatar" />

        <p className="text-2xl mt-2 text-gray-700">{data?.user?.login}</p>

        <p className="text-sm mt-2 text-gray-500">Joined at {dayjs(data?.user?.createdAt).format("MM/DD/YYYY")}</p>

        {!!data?.user?.bio && <p className="mt-4 w-full h-12 p-2 text-lg text-gray-700">{data?.user?.bio}</p>}

        <div className="flex flex-row items-center text-sm text-gray-600 gap-2">
          <span>{data?.user?.followers.totalCount || 0} followers</span>

          <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
            <circle cx={1} cy={1} r={1} />
          </svg>

          <span>{data?.user?.following.totalCount || 0} following</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div>
          <h6>{data?.user?.repositories.totalCount || 0} Repositories</h6>
        </div>

        <ul role="list" className="divide-y divide-gray-100 w-full">
          {(data?.user?.repositories.nodes || []).map((item) => (
            <RepositoryListItem item={item as Repository} key={item?.nameWithOwner}></RepositoryListItem>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default User;
