import { collection, doc, setDoc, db, getDoc, addDoc, getDocs, deleteDoc, updateDoc, serverTimestamp, query, orderBy } from "../firebase/Config";
import { Asset } from "../types/asset";
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

const getAssets = async (userId:string) => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "assets", userId, "assetList"), orderBy("creationDate")));
        let resultArray = Array<Asset>();
        querySnapshot.forEach((doc) => {
            let docData = doc.data();
            let asset = assetTypes.filter(x => x.key == docData.assetTypeId)[0];
            resultArray.push({
                ID: doc.id,
                AssetTypeId: docData.assetTypeId,
                Symbol: asset.symbol,
                Name: asset.name,
                Amount: docData.amount
            });
        });
        console.log("getAssets:", resultArray);
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

export { addAsset, updateAsset, deleteAsset, getAssets }