import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Function to handle page navigation
  const handleClick = (page) => {
    onPageChange(page);
  };

  // Generate an array of page numbers
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <button
            className="page-link"
            onClick={() => handleClick(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page && "active"}`}
          >
            <button className="page-link" onClick={() => handleClick(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
          <button
            className="page-link"
            onClick={() => handleClick(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
