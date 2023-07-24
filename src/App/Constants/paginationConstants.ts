export const paginationFields = [ "page", "limit", "sortBy", "sortOrder", "searchTerm" ];

// Users Constants
export const searchFields = [ "location", "breed", "category"];
export const searchQueryFields = [ "searchTerm", "location", "breed", "category", "label", "price", "weight", "age" ]

export interface IPagination {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    searchTerm?: string;
}

export interface IQueryResponse<T> {
    meta: {
        page: number;
        limit: number;
        total: number;
    },
    data: T| null;
}