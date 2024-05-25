import KanbanBoard from "../components/KanbanBoard";

const HomePage = () => {
  return (
    <div className="flex flex-col w-auto min-h-screen overflow-x-auto rounded-md bg-colorLightBlue">
      <div className="flex items-center justify-center h-40 bg-white">
        <h1 className="text-4xl font-bold text-customBlue">Budget Manager</h1>
      </div>
      <KanbanBoard />
    </div>
  );
};

export default HomePage;
