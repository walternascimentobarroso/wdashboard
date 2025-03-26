import { FC } from "react";

const Sidebar: FC = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white p-5">
      <h2 className="text-xl mb-5">Dashboard</h2>
      <ul>
        <li className="mb-3">
          <a href="#" className="hover:bg-gray-700 p-2 rounded">
            Home
          </a>
        </li>
        <li className="mb-3">
          <a href="#" className="hover:bg-gray-700 p-2 rounded">
            Settings
          </a>
        </li>
        <li>
          <a href="#" className="hover:bg-gray-700 p-2 rounded">
            Profile
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
