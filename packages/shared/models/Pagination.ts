export class Pagination {
    totalPages: number;
    totalItems: number;
    pageIndex: number;
    pageSize: number;
    setPageIndex?: (index: number) => void;
    setPageSize?: (size: number) => void;

    constructor(
        totalPages: number = 0,
        totalItems: number = 0,
        pageIndex: number = 1,
        pageSize: number = 10, 
    ) {
        this.totalPages = totalPages;
        this.totalItems = totalItems;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
    }
}
