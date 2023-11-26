import React, {useState, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { assetTypes } from '../constants/AssetTypes';
import Octicons from 'react-native-vector-icons/Octicons';
import { styles, fontFamily} from '../styles/globalStyles';
import Dimensions from '../constants/Dimensions';

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
                fontSize: Dimensions.fontSize,
                fontFamily: fontFamily,
              },
              inputIOSContainer:{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                ...props.containerStyle,
              },
              inputAndroidContainer: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                ...props.containerStyle
              },
              inputIOS: {
                color: 'black',
                fontSize: Dimensions.fontSize,
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: Dimensions.borderRadius,
                fontFamily: fontFamily,
                ...props.style,
                ...props.isDarkMode ? styles.assetPickerDark : styles.assetPickerLight
              },
              inputAndroid: {
                color: 'black',
                fontSize: Dimensions.fontSize,
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: Dimensions.borderRadius,
                fontFamily: fontFamily,
                ...props.style,
                ...props.isDarkMode ? styles.assetPickerDark : styles.assetPickerLight
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
          darkTheme={props.isDarkMode}
          Icon={() => {
            return <Octicons name="chevron-down" size={22} color={props.icon?.color ?? "black"} />
          }}
        />
  )
}