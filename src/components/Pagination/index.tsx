import React from "react";

interface PaginationProps {
  total?: number;
  currentPage?: number;
  lastPage?: number;
  hasNextPage?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  currentPage,
  lastPage,
  hasNextPage,
}) => {
  const handlePreviousPage = () => {
    // Logic to handle going to the previous page
    // You can update the state or make an API call here
  };

  const handleNextPage = () => {
    // Logic to handle going to the next page
    // You can update the state or make an API call here
  };

  return (
    <div>
      <p>Total: {total}</p>
      <p>
        Page {currentPage} of {lastPage}
      </p>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={handleNextPage} disabled={!hasNextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
