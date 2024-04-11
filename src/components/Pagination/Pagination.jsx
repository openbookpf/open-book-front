import React, { useState } from "react";

export default function Pagination({ totalItems, itemsPerPage, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div>
      <button onClick={goToPrevPage} disabled={currentPage === 1}>Anterior</button>
      <span>Pagina {currentPage} de {totalPages}</span>
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>Siguiente</button>
    </div>
  );
}
