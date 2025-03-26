import { FC } from "react";

const Content: FC = () => {
  return (
    <main className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-6">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow-lg">
          <h3 className="text-xl font-medium">Card 1</h3>
          <p>Content for card 1.</p>
        </div>
        <div className="bg-white p-6 rounded shadow-lg">
          <h3 className="text-xl font-medium">Card 2</h3>
          <p>Content for card 2.</p>
        </div>
        <div className="bg-white p-6 rounded shadow-lg">
          <h3 className="text-xl font-medium">Card 3</h3>
          <p>Content for card 3.</p>
        </div>
      </div>
    </main>
  );
};

export default Content;
