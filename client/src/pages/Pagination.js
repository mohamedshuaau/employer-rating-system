import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

/**
 * Pagination Component
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Pagination(props) {

  const { meta, pagination, setPagination } = props;

  // handle previous page button click
  const handlePreviousPageClick = () => {
    if (meta.current_page == 1) {
      return;
    }
    const page = parseInt(meta.current_page) - 1;
    setPagination({page: page})
  }

  // handle next page button click
  const handleNextPageClick = () => {
    if (meta.current_page == meta.total_pages) {
      return;
    }
    const page = parseInt(meta.current_page) + 1;
    setPagination({page:  page})
    console.log(pagination)
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{meta?.current_page}</span> of <span className="font-medium">{meta?.total_pages}</span>. Total <span className="font-medium">{meta?.total_items}</span> items.
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => handlePreviousPageClick()}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => handleNextPageClick()}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
