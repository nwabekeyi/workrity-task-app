import React from "react";
import { FaList, FaTh } from "react-icons/fa"; // Import the icons from react-icons

const sortValues = [
  { value: "order-added", title: "Order added" },
  { value: "min-date", title: "Earlier first" },
  { value: "max-date", title: "Later first" },
  { value: "completed-first", title: "Completed first" },
  { value: "uncompleted-first", title: "Uncompleted first" },
];

const ButtonsSort: React.FC<{
  isListInView1: boolean;
  sortedBy: string;
  setSortedBy: (option: string) => void;
  setIsListInView1: (status: boolean) => void;
}> = ({ isListInView1, setIsListInView1, sortedBy, setSortedBy }) => {
  return (
    <div className="flex children-styles">
      <button
        onClick={() => setIsListInView1(true)}
        title="View in list"
        className={`p-2 rounded-full ${isListInView1 ? "text-blue-500" : ""}`}
      >
        {/* Using FaList for List view */}
        <FaList size={20} />
      </button>
      <button
        onClick={() => setIsListInView1(false)}
        title="View in grid"
        className={`p-2 rounded-full ${!isListInView1 ? "text-blue-500" : ""}`}
      >
        {/* Using FaTh for Grid view */}
        <FaTh size={20} />
      </button>
      <select
        className="ml-auto inputStyles"
        value={sortedBy}
        onChange={({ target }) => setSortedBy(target.value)}
      >
        <option value="" disabled>
          Sort by
        </option>
        {sortValues.map((val) => (
          <option
            key={val.value}
            value={val.value}
            className="bg-slate-100 dark:bg-slate-800"
          >
            {val.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ButtonsSort;
