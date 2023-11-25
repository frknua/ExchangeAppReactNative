import { collection, doc, setDoc, db, getDoc, addDoc, getDocs, deleteDoc, updateDoc, serverTimestamp, query, orderBy, onSnapshot } from "../firebase/Config";
import { Asset } from "../types/asset";
import { Currency } from "../types/Currency";
import { assetTypeIdEnum, assetTypes } from "../constants/AssetTypes";

const addAsset = async (userId:string, assetTypeId: number, amount: number, callback: any) => {
    try {
        const docRef = await addDoc(collection(db, "assets", userId, "assetList"), {
            assetTypeId: assetTypeId,
            amount: amount,
            symbol: assetTypes.filter(x => x.key == assetTypeId)[0].symbol,
            creationDate: serverTimestamp()
        });
        await getAsset(userId, docRef.id, callback);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const updateAsset = async (userId:string, documentId: string, amount: number, callback: any) => {
    try {
        await updateDoc(doc(db, "assets", userId, "assetList", documentId), {
            amount: amount
        });
        await getAsset(userId, documentId, callback);
    } catch (e) {
        console.error("Error updating document: ", e);
        throw(e);
    }
}

const getAsset = async (userId:string, documentId: string, callback: any) => {
    try {
        let result:Asset;
        const docRef = doc(db, "assets", userId, "assetList", documentId);
        getDoc(docRef).then((doc) => {
            if(doc.exists())
            {
                let docData = doc.data();
                let asset = assetTypes.filter(x => x.key == docData?.assetTypeId)[0];
                result = {
                    ID: doc.id,
                    AssetTypeId: docData.assetTypeId,
                    Symbol: asset.symbol,
                    Name: asset.name,
                    Amount: docData.amount
                };
            }
            callback(result);
        });
    }
    catch (e) {
        console.error("Error getting document: ", e);
        throw(e);
    }
}

const getAssets = (userId:string) => {
    try {
        let resultArray = Array<Asset>();
        getDocs(query(collection(db, "assets", userId, "assetList"), orderBy("creationDate")))
        .then((querySnapshot) => {
        if(!querySnapshot.empty){
            querySnapshot.forEach((doc) => {
                if(doc.exists())
                {
                    let docData = doc.data();
                    let asset = assetTypes.filter(x => x.key == docData?.assetTypeId)[0];
                    resultArray.push({
                        ID: doc.id,
                        AssetTypeId: docData.assetTypeId,
                        Symbol: asset.symbol,
                        Name: asset.name,
                        Amount: docData.amount
                    });
                }
            });
        }
        return resultArray;
    });
    return resultArray;
    } catch (e) {
        console.error("Error getting document: ", e);
    }
}

const deleteAsset = async (userId:string, documentId: string, callback: any) => {
    try {
        await deleteDoc(doc(db, "assets", userId, 'assetList', documentId));
        callback();
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

const unsub = (callback:any) => onSnapshot(doc(db, "currencies", "current"), (doc) => {
    if(doc.exists())
    {
        let docData = doc.data();
        let result: Currency = {
            updateDate: docData.updateDate,
            data: [
                {
                    assetTypeId: assetTypeIdEnum.USD,
                    buying: docData.buyingUsd,
                    selling: docData.sellingUsd
                },
                {
                    assetTypeId: assetTypeIdEnum.EUR,
                    buying: docData.buyingEur,
                    selling: docData.sellingEur
                },
                {
                    assetTypeId: assetTypeIdEnum.GBP,
                    buying: docData.buyingGbp,
                    selling: docData.sellingGbp
                },
                {
                    assetTypeId: assetTypeIdEnum.CHF,
                    buying: docData.buyingChf,
                    selling: docData.sellingChf
                },
                {
                    assetTypeId: assetTypeIdEnum.CAD,
                    buying: docData.buyingCad,
                    selling: docData.sellingCad
                },
                {
                    assetTypeId: assetTypeIdEnum.AUD,
                    buying: docData.buyingAud,
                    selling: docData.sellingAud
                },
                {
                    assetTypeId: assetTypeIdEnum.GRAM,
                    buying: docData.buyingGram,
                    selling: docData.sellingGram
                },
                {
                    assetTypeId: assetTypeIdEnum.CEYREK,
                    buying: docData.buyingCeyrek,
                    selling: docData.sellingCeyrek
                },
                {
                    assetTypeId: assetTypeIdEnum.YARIM,
                    buying: docData.buyingYarim,
                    selling: docData.sellingYarim
                },
                {
                    assetTypeId: assetTypeIdEnum.TAM,
                    buying: docData.buyingTam,
                    selling: docData.sellingTam
                },
                {
                    assetTypeId: assetTypeIdEnum.CUMHURIYET,
                    buying: docData.buyingCumhuriyet,
                    selling: docData.sellingCumhuriyet
                }
            ]
        };
        callback(result);
    }
});

export { addAsset, updateAsset, deleteAsset, getAssets, unsub }