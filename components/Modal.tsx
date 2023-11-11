import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';
import AssetPicker from './AssetPicker';
import { Portal } from 'react-native-portalize';
import { styles } from '../styles/globalStyles';

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
            width: "100%"
        },
        icon:{
            position: "absolute",
            top: 10,
            right: 12
          }
    }
    return (
        <Portal>
            <Modalize ref={modalizeRef} onClose={() => props.onClose()} modalStyle={styles.modalContainer}
                avoidKeyboardLikeIOS={true}>
                <View style={styles.modalMainView}>
                    <TextInput
                        style={[styles.input, styles.shadow]}
                        onChangeText={onChangeAmount}
                        placeholder="Miktar Giriniz"
                        keyboardType="numeric"
                    />
                    {!props.isEditMode && <AssetPicker style={assetPickerParam.style} icon={assetPickerParam.icon} onChange={(value: any) => setAssetTypeId(value)}></AssetPicker>}
                    <TouchableOpacity style={[styles.button, styles.shadow]}
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
