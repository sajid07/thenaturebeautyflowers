import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Function to handle page navigation
  console.log("pagination", totalPages);
  const handleClick = (page) => {
    onPageChange(page);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <button
            className="page-link"
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li
            key={index + 1}
            className={`page-item ${currentPage === index + 1 && "active"}`}
          >
            <button
              className="page-link"
              onClick={() => handleClick(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
          <button
            className="page-link"
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
