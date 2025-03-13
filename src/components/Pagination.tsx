import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../index.css";

type Props = {
  totalProducts: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({
  totalProducts,
  pageSize,
  currentPage,
  setCurrentPage,
}: Props) => {
  const noOfPages: number = Math.ceil(totalProducts / pageSize);

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (noOfPages <= 7) {
      for (let i = 1; i <= noOfPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    const leftBound = Math.max(2, currentPage - 1);
    const rightBound = Math.min(noOfPages - 1, currentPage + 1);

    if (leftBound > 2) {
      pages.push("...");
    } else {
      pages.push(2);
    }

    for (let i = leftBound; i <= rightBound; i++) {
      if (i > 2 && i < noOfPages - 1) {
        pages.push(i);
      }
    }

    if (rightBound < noOfPages - 1) {
      pages.push("...");
    } else {
      pages.push(noOfPages - 1);
    }

    pages.push(noOfPages);
    return pages;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < noOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination-container">
      <div className="pagination-pages">
        <div
          className={`page indicators ${currentPage === 1 ? "disabled" : ""}`}
          onClick={handlePrevPage}
        >
          <FaAngleLeft />
        </div>
        {getPages().map((page, index) => (
          <div
            key={index}
            className={`page ${page === currentPage ? "active" : ""}`}
            onClick={() =>
              typeof page === "number" ? onPageChange(page) : null
            }
          >
            {page}
          </div>
        ))}
        <div
          className={`page indicators ${
            currentPage === noOfPages ? "disabled" : ""
          }`}
          onClick={handleNextPage}
        >
          <FaAngleRight />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
