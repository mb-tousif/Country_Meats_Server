export enum ELocation {
    "dhaka" = "Dhaka",
    "chittagong" = "Chittagong",
    "cumilla" = "Cumilla",
    "rajshahi" = "Rajshahi",
    "khulna" = "Khulna",
    "barisal" = "Barisal",
    "sylhet" = "Sylhet",
    "rangpur" = "Rangpur",
    "mymensingh" = "Mymensingh",
};

export enum ECcategory {
    Dairy = "Dairy",
    Beef = "Beef",
    DualPurpose = "DualPurpose",
};

export enum ELabel {
    forSale = "for sale",
    soldOut = "sold out",
};

export type TSearchedCow = {
    searchTerm?: string;
};