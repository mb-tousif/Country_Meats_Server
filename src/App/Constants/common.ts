export enum ECategory {
    Dairy = "Dairy",
    Beef = "Beef",
    DualPurpose = "DualPurpose",
};

export enum ELabel {
    forSale = "for sale",
    soldOut = "sold out",
};

export type TSearched = {
    searchTerm?: string;
};