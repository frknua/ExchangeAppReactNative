import React, { useRef, useEffect, useState } from 'react';
import { Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Modalize } from 'react-native-modalize';
import AssetPicker from './AssetPicker';
import { Portal } from 'react-native-portalize';
import { styles } from '../styles/globalStyles';
import Colors from '../constants/Colors';

export default function Modal(props: any) {
    const modalizeRef = useRef<Modalize>(null);
    const accessibilityLanguage = "tr-TR";

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
                keyboardAvoidingBehavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardAvoidingOffset={10}
                avoidKeyboardLikeIOS={true}
                > 
                <KeyboardAvoidingView 
                    style={styles.modalMainView}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={20}
                    accessible={true}
                    accessibilityHint='Varlık ekleme ve güncelleme işlemleri bu ekrandan yapılır'
                    accessibilityLanguage={accessibilityLanguage}>
                    <SafeAreaView style={{flex:1}}>
                        <TextInput 
                            autoFocus={true}
                            style={[styles.input, props.isDarkMode ? styles.inputDark : styles.inputLight]}
                            onChangeText={(t) => setAmount(t)}
                            placeholder="Miktar Giriniz"
                            keyboardType="numeric"
                            placeholderTextColor={props.isDarkMode ? Colors.dark.inputFontColor : Colors.light.inputFontColor}
                            accessible={true}
                            accessibilityHint='Eklemek veya güncellemek için miktar giriniz'
                            accessibilityLanguage={accessibilityLanguage}
                        />
                        {!props.isEditMode && <AssetPicker style={assetPickerParam.style} icon={assetPickerParam.icon} onChange={(value: any) => setAssetTypeId(value)} isDarkMode={props.isDarkMode}></AssetPicker>}
                        <TouchableOpacity 
                            style={[styles.button, styles.shadow]}
                            onPress={() => {
                                props.onSave(props.isEditMode ? null : Number(assetTypeId), Number(amount));
                                modalizeRef.current?.close();
                                props.onClose();
                            }}
                            accessible={true}
                            accessibilityHint="Ekleme veya güncelleme işlemini tamamlar"
                            accessibilityLanguage={accessibilityLanguage}>
                            <Text style={styles.buttonText}>{props.isEditMode ? "Güncelle" : "Ekle"}</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </Modalize>
        </Portal>
    );
};
