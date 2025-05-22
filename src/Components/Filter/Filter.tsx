import Select from "../Custom/Select/Select";
import Input from "../Custom/Input/Input";
import { useSelector, useDispatch } from "react-redux";
import { setLimit, setSortBy, setTitle } from "../../store/filterSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: any) => state.filter);

  const handleInputChange = (e: any) => {
    dispatch(setTitle(e.target.value));
  };

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value));
  };

  const handleLimitChange = (value: number) => {
    dispatch(setLimit(value));
  };

  return (
    <div className="bg-white dark:bg-gray-800 mb-2 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row gap-4 md:items-end justify-between">
        <div className="flex-1 min-w-[250px]">
          <Input
            label="Search posts"
            type="text"
            placeholder="Type to search..."
            className="pl-10 "
            value={filter.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="min-w-[150px]">
          <Select
            label="Sort by"
            options={["latest", "oldest", "a-z", "z-a"]}
            value={filter.sortBy}
            onChange={handleSortChange}
            className="dark:text-gray-200"
          />
        </div>

        <div className="min-w-[150px]">
          <Select
            label="Limit"
            options={[5, 10, 15, 20]}
            value={filter.limit}
            onChange={handleLimitChange}
            className="dark:text-gray-200"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
