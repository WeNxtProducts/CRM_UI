'use client'

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  total: number; // Total number of records
  pageSize: number; // Number of records per page
  onPageChange: (page: number) => void; // Function to handle page change
}

interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  children: React.ReactNode;
}

const Pagination: React.FC<PaginationProps> = ({ total, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputPage, setInputPage] = useState<string>("");

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handleInputBlur = () => {
    const pageNumber = Number(inputPage);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      goToPage(pageNumber);
    }
    setInputPage("");
  };

  const renderPageNumbers = () => {
    const pages = [];
    const range = 2; // Show ±2 pages around the current page

    // Always show first two pages
    if (currentPage > 3) {
      pages.push(<PaginationItem key={1} onClick={() => goToPage(1)}>1</PaginationItem>);
      if (currentPage > 4) {
        pages.push(<PaginationEllipsis key="start-ellipsis" />);
      }
    }

    // Generate the dynamic middle range of pages
    for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
      pages.push(
        <PaginationItem key={i} isActive={i === currentPage} onClick={() => goToPage(i)}>
          {i}
        </PaginationItem>
      );
    }

    // Always show last two pages
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pages.push(<PaginationEllipsis key="end-ellipsis" />);
      }
      pages.push(<PaginationItem key={totalPages} onClick={() => goToPage(totalPages)}>{totalPages}</PaginationItem>);
    }

    return pages;
  };

  return (
    <nav role="navigation" aria-label="pagination" className="mx-auto flex w-full justify-center">
      <ul className="flex flex-row items-center gap-1">
        <PaginationFirst disabled={currentPage === 1} onClick={() => goToPage(1)}>
          <ChevronsLeft className="h-4 w-4" />
        </PaginationFirst>
        <PaginationPrevious disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>
          <ChevronLeft className="h-4 w-4" />
        </PaginationPrevious>

        {renderPageNumbers()}

        <PaginationNext disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>
          <ChevronRight className="h-4 w-4" />
        </PaginationNext>
        <PaginationLast disabled={currentPage === totalPages} onClick={() => goToPage(totalPages)}>
          <ChevronsRight className="h-4 w-4" />
        </PaginationLast>

        {/* Input field for direct navigation */}
        {total > pageSize && (
          <form className="ml-2 flex items-center gap-1">
            <span>Go to</span>
            <input
              type="text"
              className="w-12 py-1 bg-white text-center border rounded-md"
              value={inputPage}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="0"
            />
            <span>page</span>
          </form>

        )}
      </ul>
    </nav>
  );
};

const PaginationButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ disabled, children, ...props }) => (
  <button className={cn("p-2", disabled ? "text-gray-400 cursor-not-allowed" : "hover:text-black")} disabled={disabled} {...props}>
    {children}
  </button>
);

const PaginationFirst: React.FC<PaginationButtonProps> = (props) => (
  <PaginationButton {...props}>
    <ChevronsLeft className="h-4 w-4" />
  </PaginationButton>
);

const PaginationPrevious: React.FC<PaginationButtonProps> = (props) => (
  <PaginationButton {...props}>
    <ChevronLeft className="h-4 w-4" />
  </PaginationButton>
);

const PaginationNext: React.FC<PaginationButtonProps> = (props) => (
  <PaginationButton {...props}>
    <ChevronRight className="h-4 w-4" />
  </PaginationButton>
);

const PaginationLast: React.FC<PaginationButtonProps> = (props) => (
  <PaginationButton {...props}>
    <ChevronsRight className="h-4 w-4" />
  </PaginationButton>
);

const PaginationItem: React.FC<{ isActive?: boolean; children: React.ReactNode; onClick?: () => void }> = ({ isActive, children, onClick }) => (
  <button className={cn("px-[10px] py-[3px] rounded-md", isActive ? "bg-primary text-primary-foreground hover:bg-primary-btnforeground" : "hover:bg-gray-200")} onClick={onClick}>
    {children}
  </button>
);

const PaginationEllipsis: React.FC = () => (
  <span className="px-3 py-2 text-gray-500">
    <MoreHorizontal className="h-4 w-4" />
  </span>
);

export default Pagination;
