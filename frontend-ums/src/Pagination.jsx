function Pagination({ currentPage, totalPage, onPageChange }) {
    if (totalPage <= 1) return null;

    // Helper untuk membuat daftar nomor halaman (dengan ellipsis jika banyak halaman)
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPage <= maxVisible + 2) {
            for (let i = 1; i <= totalPage; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPage - 1, currentPage + 1);

            if (currentPage <= 3) {
                start = 2;
                end = 4;
            } else if (currentPage >= totalPage - 2) {
                start = totalPage - 3;
                end = totalPage - 1;
            }

            if (start > 2) {
                pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPage - 1) {
                pages.push('...');
            }

            pages.push(totalPage);
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex flex-col items-center gap-3 my-8">
            <div className="flex items-center gap-1 sm:gap-2">
                {/* Tombol Previous */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    &laquo; Prev
                </button>

                {/* Tombol Nomor Halaman */}
                {pages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-2 py-1 text-gray-400 select-none"
                            >
                                ...
                            </span>
                        );
                    }

                    const isActive = page === currentPage;
                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`min-w-9 px-3 py-1.5 text-sm font-semibold rounded-lg transition ${isActive
                                    ? "bg-sky-500 text-white shadow-sm"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-sky-50 hover:text-sky-600"
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Tombol Next */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPage}
                    className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg bg-sky-500 text-white hover:bg-sky-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed transition"
                >
                    Next &raquo;
                </button>
            </div>

            {/* Info Halaman */}
            <p className="text-xs text-gray-500">
                Page <span className="font-semibold text-gray-700">{currentPage}</span> of{" "}
                <span className="font-semibold text-gray-700">{totalPage}</span>
            </p>
        </div>
    );
}

export default Pagination;

