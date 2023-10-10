import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';
import AssetPicker from './AssetPicker';
import { Portal } from 'react-native-portalize';

export default function Modal(props: any) {
    const modalizeRef = useRef<Modalize>(null);

    useEffect(() => {
        if (props.show)
            modalizeRef.current?.open();
    }, [props.show]);

    const [amount, onChangeAmount] = useState('');
    const [assetTypeId, setAssetTypeId] = useState('');
    let assetPickerParam = {
        style: {
            width: "auto"
        }
    }
    return (
        <Portal>
            <Modalize ref={modalizeRef} onClose={() => props.onClose()} modalStyle={{ backgroundColor: "#e0e0e0", marginTop: 400 }}
                avoidKeyboardLikeIOS={true}>
                <View style={{ display: "flex", flexDirection: "column", margin: 15 }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeAmount}
                        placeholder="Miktar Giriniz"
                        keyboardType="numeric"
                    />
                    {!props.isEditMode && <AssetPicker style={assetPickerParam.style} onChange={(value: any) => setAssetTypeId(value)}></AssetPicker>}
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            props.onSave(props.isEditMode ? null : Number(assetTypeId), Number(amount));
                            modalizeRef.current?.close();
                            props.onClose();
                        }}>
                        <Text style={styles.buttonText}>{props.isEditMode ? "Güncelle" : "Ekle"}</Text>
                    </TouchableOpacity>
                </View>
            </Modalize>
        </Portal>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 45,
        marginBottom: 10,
        backgroundColor: "#fff",
        color: "#000",
        padding: 8,
        fontSize: 16,
        borderRadius: 8
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginTop: 10
    },
    buttonText: {
        fontSize: 16
    }
});
