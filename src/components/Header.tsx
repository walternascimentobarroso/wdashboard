import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="w-full bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span>Welcome, User</span>
        <button className="bg-blue-800 px-4 py-2 rounded">Logout</button>
      </div>
    </header>
  );
};

export default Header;
