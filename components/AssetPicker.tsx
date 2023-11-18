import React, {Component, useState, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { assetTypes } from '../constants/AssetTypes';
import Octicons from 'react-native-vector-icons/Octicons';
import { styles } from '../styles/globalStyles';

export default function AssetPicker (props:any) {
  const [assetTypeList, setAssetTypeList] = useState<any>([]);
  const [selectedAssetType, setSelectedAssetType] = useState(1);

  useEffect(() => {
    setAssetTypeList(assetTypes.map(function(elem,index){
      return {label: elem.name, value:elem.key}
    }));
  },[]);

  const onValueChange = (value:any) => {
    setSelectedAssetType(value);
    props.onChange(value);
  }

  return (
    <RNPickerSelect
            style={{
              placeholder: {
                color: 'gray',
                fontSize: 16,
                fontFamily: "MarkPro",
              },
              inputIOSContainer:{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              },
              inputAndroidContainer: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              },
              inputIOS: {
                color: 'black',
                fontSize: 16,
                padding: 10,
                paddingVertical: 12,
                backgroundColor: "#fff",
                borderRadius: 20,
                // minWidth: 230,
                fontFamily: "MarkPro",
                // ...styles.shadow,
                ...props.style,
              },
              inputAndroid: {
                color: 'black',
                fontSize: 16,
                padding: 10,
                paddingVertical: 12,
                backgroundColor: "#fff",
                borderRadius: 20,
                // minWidth: 230,
                fontFamily: "MarkPro",
                // ...styles.shadow,
                ...props.style,
              },
              iconContainer: {
                position: "relative",
                ...props.icon
              },
            }}
            onValueChange={(value) => onValueChange(value)}
            items={assetTypeList}
            placeholder={{
              label: 'Lütfen birim seçiniz',
              value: null,
          }}
          value={selectedAssetType}
          doneText='Tamam'
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return <Octicons name="chevron-down" size={22} color={props.icon?.color ?? "black"} />
          }}
        />
  )
}