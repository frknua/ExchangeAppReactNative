export const assetTypeEnum = {
    CURRENCY: 1,
    GOLD: 2
}
export const assetTypeIdEnum = {
    TRY: 1,
    USD: 2,
    EUR: 3,
    GBP: 4,
    CHF: 5,
    CAD: 6,
    AUD: 7,
    GRAM: 8,
    CEYREK: 9,
    YARIM: 10,
    TAM: 11,
    CUMHURIYET: 12
}
export const assetTypes = [
{
    key: assetTypeIdEnum.TRY,
    type: assetTypeEnum.CURRENCY,
    name: "Türk Lirası",
    symbol: "Try",
    cultureCode: "tr-TR"
},
{
    key: assetTypeIdEnum.USD,
    type: assetTypeEnum.CURRENCY,
    name: "Amerikan Doları",
    symbol: "Usd",
    cultureCode: "en-US"
},
{
    key: assetTypeIdEnum.EUR,
    type: assetTypeEnum.CURRENCY,
    name: "Euro",
    symbol: "Eur",
    cultureCode: "de-DE"
},
{
    key: assetTypeIdEnum.GBP,
    type: assetTypeEnum.CURRENCY,
    name: "Sterlin",
    symbol: "Gbp",
    cultureCode: "en-GB"
},
{
    key: assetTypeIdEnum.CHF,
    type: assetTypeEnum.CURRENCY,
    name: "İsviçre Frangı",
    symbol: "Chf",
    cultureCode: "fr-CH"
},
{
    key: assetTypeIdEnum.CAD,
    type: assetTypeEnum.CURRENCY,
    name: "Kanada Doları",
    symbol: "Cad",
    cultureCode: "en-CA"
},
{
    key: assetTypeIdEnum.AUD,
    type: assetTypeEnum.CURRENCY,
    name: "Avustralya Doları",
    symbol: "Aud",
    cultureCode: "en-AU"
},
{
    key: assetTypeIdEnum.GRAM,
    type: assetTypeEnum.GOLD,
    name: "Gram Altın",
    symbol: "Gram",
    cultureCode: ""
},
{
    key: assetTypeIdEnum.CEYREK,
    type: assetTypeEnum.GOLD,
    name: "Çeyrek Altın",
    symbol: "Çeyrek",
    cultureCode: ""
},
{
    key: assetTypeIdEnum.YARIM,
    type: assetTypeEnum.GOLD,
    name: "Yarım Altın",
    symbol: "Yarım",
    cultureCode: ""
},
{
    key: assetTypeIdEnum.TAM,
    type: assetTypeEnum.GOLD,
    name: "Tam Altın",
    symbol: "Tam",
    cultureCode: ""
},
{
    key: assetTypeIdEnum.CUMHURIYET,
    type: assetTypeEnum.GOLD,
    name: "Cumhuriyet Altını",
    symbol: "Cumhuriyet",
    cultureCode: ""
}
];