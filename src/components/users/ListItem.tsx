import type { User } from "graphql/generated";
import { Link } from "react-router-dom";

const UserListItem: React.FC<{ item: Partial<User> }> = ({ item }) => {
  return (
    <li key={item.name} className="flex justify-between gap-x-6 py-5">
      <div className="flex gap-x-4">
        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={item.avatarUrl} alt="user avatar" />
        <div className="min-w-0 flex-auto">
          <Link to={`/users/${item.login}`}>
            <p className="text-sm font-semibold leading-6 text-gray-900">{item.login || item.name}</p>
          </Link>
          <p className="mt-1 text-xs leading-5 text-gray-500">{item.bio}</p>
        </div>
      </div>
    </li>
  );
};

export default UserListItem;
