import { collection, doc, setDoc, db, getDoc, addDoc, getDocs, deleteDoc, updateDoc, serverTimestamp, query, orderBy, onSnapshot } from "../firebase/Config";
import { Asset } from "../types/asset";
import { Currency } from "../types/Currency";
import { assetTypes } from "../constants/AssetTypes";

const addAsset = async (userId:string, assetTypeId: number, amount: number) => {
    try {
        const docRef = await addDoc(collection(db, "assets", userId, "assetList"), {
            assetTypeId: assetTypeId,
            amount: amount,
            symbol: assetTypes.filter(x => x.key == assetTypeId)[0].symbol,
            creationDate: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const updateAsset = async (userId:string, documentId: string, amount: number) => {
    try {
        await updateDoc(doc(db, "assets", userId, "assetList", documentId), {
            amount: amount
        });
    } catch (e) {
        console.error("Error updating document: ", e);
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
        console.log("getAssets:", resultArray);
        return resultArray;
    });
    return resultArray;
    } catch (e) {
        console.error("Error getting document: ", e);
    }
}

const deleteAsset = async (userId:string, documentId: string) => {
    try {
        await deleteDoc(doc(db, "assets", userId, 'assetList', documentId));
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

const unsub = (callback:any) => onSnapshot(doc(db, "currencies", "current"), (doc) => {
    if(doc.exists())
    {
        let docData = doc.data();
        let currencies: Currency = {
            buyingUsd: docData.buyingUsd,
            sellingUsd: docData.sellingUsd,
            buyingEur: docData.buyingEur,
            sellingEur: docData.sellingEur,
            buyingGbp: docData.buyingGbp,
            sellingGbp: docData.sellingGbp,
            buyingChf: docData.buyingChf,
            sellingChf: docData.sellingChf,
            buyingCad: docData.buyingCad,
            sellingCad: docData.sellingCad,
            buyingAud: docData.buyingAud,
            sellingAud: docData.sellingAud,
            buyingGram: docData.buyingGram,
            sellingGram: docData.sellingGram,
            buyingCeyrek: docData.buyingCeyrek,
            sellingCeyrek: docData.sellingCeyrek,
            buyingYarim: docData.buyingYarim,
            sellingYarim: docData.sellingYarim,
            buyingTam: docData.buyingTam,
            sellingTam: docData.sellingTam,
            buyingCumhuriyet: docData.buyingCumhuriyet,
            sellingCumhuriyet: docData.sellingCumhuriyet,
            updateDate: docData.updateDate
        }
        callback(currencies);
    }
});

export { addAsset, updateAsset, deleteAsset, getAssets, unsub }