import { Repository } from "graphql/generated";

interface IProps {
  item: Pick<Repository, "nameWithOwner" | "updatedAt" | "stargazerCount" | "description" | "forkCount">;
}

const RepositoryListItem: React.FC<IProps> = ({ item }) => {
  return (
    <li key={item.nameWithOwner} className="flex items-center justify-between gap-x-6 py-5 w-full">
      <div className="min-w-0">
        <div className="flex items-start gap-x-3">
          <p className="text-sm font-semibold leading-6 text-gray-900">{item.nameWithOwner}</p>
        </div>
        <div className="mt-1 w-full flex justify-between items-center gap-x-2 text-xs leading-5 text-gray-500">
          <p className="whitespace-nowrap">
            Updated on <time dateTime={item.updatedAt}>{item.updatedAt}</time>
          </p>
          <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
            <circle cx={1} cy={1} r={1} />
          </svg>
        </div>
      </div>
      <div className="flex flex-none items-center gap-x-4 text-xs leading-5 text-gray-500">
        Forks: {item.forkCount} Stars: {item.stargazerCount}
      </div>
    </li>
  );
};

export default RepositoryListItem;
