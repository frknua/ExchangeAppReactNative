export interface Currency{
    data: Array<CurrencyItem>;
    updateDate?: string | undefined | null;
}

export interface CurrencyItem{
    assetTypeId: number;
    buying: number;
    selling: number;
}