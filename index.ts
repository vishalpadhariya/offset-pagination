// index.ts

export interface DataPaginationType<T> {
  currentPage: number;
  totalPages: number;
  pages: number[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: T[];
}

/**
 * DataPagination Function returns the paginates item with pagination by mid_size.
 * 
 * @param items | All Items to paginate.
 * @param currentPage | current page number.
 * @param itemsPerPage | How many item want to display at the page.
 * @param midSize | Break the pagination if there is large amount of the data and pagination is too long.
 * @returns
 *
 * ### Example usage
 * ```
 *  import { DataPagination, DataPaginationType } from 'your-package-name';
 *
 *  const items = Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));
 *  const currentPage = 3;
 *  const itemsPerPage = 10;
 *  const midSize = 2;
 *
 *  const pagination: DataPaginationType<{ id: number, name: string }> = DataPagination(items, currentPage, itemsPerPage, midSize);
 *
 *   console.log(pagination);
 *   // Output will include the current page items and pagination details
 *
 *
 * ```
 *
 */
export function DataPagination<T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number,
  midSize: number
): DataPaginationType<T> {
  if (currentPage < 1 || itemsPerPage < 1 || midSize < 0) {
    throw new Error(
      "Invalid arguments. Current page, items per page, and mid-size must be positive numbers."
    );
  }

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (currentPage > totalPages) {
    throw new Error("Current page exceeds total pages.");
  }

  const startPage = Math.max(1, currentPage - midSize);
  const endPage = Math.min(totalPages, currentPage + midSize);

  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = items.slice(startIndex, endIndex);

  return {
    currentPage,
    totalPages,
    pages,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
    items: currentItems,
  };
}
