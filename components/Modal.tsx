import React, { useRef, useEffect, useState } from 'react';
import { Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Modalize } from 'react-native-modalize';
import AssetPicker from './AssetPicker';
import { Portal } from 'react-native-portalize';
import { styles } from '../styles/globalStyles';
import Colors from '../constants/Colors';

export default function Modal(props: any) {
    const modalizeRef = useRef<Modalize>(null);

    useEffect(() => {
        if (props.show)
        {
            modalizeRef.current?.open();
            if(!props.isEditMode)
            setAmount("0");
        }
    }, [props.show]);

    const [amount, onChangeAmount] = useState('');
    const [assetTypeId, setAssetTypeId] = useState('');
    const setAmount = (text:string) => {
        onChangeAmount(text.replace(",","."));
    }

    let assetPickerParam = {
        style: {
            width: "100%",
            ...props.isDarkMode ? styles.assetPickerDark : styles.assetPickerLight
        },
        icon:{
            position: "absolute",
            top: 10,
            right: 12,
            color: props.isDarkMode ? Colors.dark.text : Colors.light.text
          }
    }
    return (
        <Portal>
            <Modalize ref={modalizeRef} onClose={() => props.onClose()} modalStyle={[styles.modalContainer, props.isDarkMode ? styles.modalContainerDark : styles.modalContainerLight]}
                // avoidKeyboardLikeIOS={true}
                keyboardAvoidingBehavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardAvoidingOffset={10}
                avoidKeyboardLikeIOS={Platform.select({ ios: true, android: true })}
                adjustToContentHeight={true}
                > 
                <KeyboardAvoidingView style={styles.modalMainView}>
                    <TextInput
                        style={[styles.input, props.isDarkMode ? styles.inputDark : styles.inputLight]}
                        onChangeText={(t) => setAmount(t)}
                        placeholder="Miktar Giriniz"
                        keyboardType="numeric"
                        placeholderTextColor={props.isDarkMode ? Colors.dark.assetFullName : Colors.light.assetFullName}
                    />
                    {!props.isEditMode && <AssetPicker style={assetPickerParam.style} icon={assetPickerParam.icon} onChange={(value: any) => setAssetTypeId(value)} isDarkMode={props.isDarkMode}></AssetPicker>}
                    <TouchableOpacity style={[styles.button, styles.shadow]}
                        onPress={() => {
                            props.onSave(props.isEditMode ? null : Number(assetTypeId), Number(amount));
                            modalizeRef.current?.close();
                            props.onClose();
                        }}>
                        <Text style={styles.buttonText}>{props.isEditMode ? "Güncelle" : "Ekle"}</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </Modalize>
        </Portal>
    );
};
