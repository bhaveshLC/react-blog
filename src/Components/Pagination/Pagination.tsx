import Button from "../Custom/Button/Button";
import { useDispatch } from "react-redux";
import { setPage } from "../../store/filterSlice";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const dispatch = useDispatch();
  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
    }
  };

  return (
    <div className="flex items-center justify-end space-x-4 p-4">
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        textColor="text-gray-800 dark:text-white"
        bgColor=" bg-white dark:bg-gray-600"
        className="shadow font-semibold border-2 border-gray-200 dark:border-gray-600"
      >
        Previous
      </Button>
      <span className=" font-medium dark:text-white">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        textColor="text-gray-800 dark:text-white"
        bgColor=" bg-white dark:bg-gray-600"
        className="shadow font-semibold border-2 border-gray-200 dark:border-gray-600"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
