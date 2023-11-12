import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    Alert,
    RefreshControl,
    ListRenderItemInfo,
    useColorScheme,
    Pressable
  } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';

import Colors from '../constants/Colors';
import DeviceInfo from 'react-native-device-info';
import AssetPicker from '../components/AssetPicker';
import Modal from '../components/Modal';
import { Asset } from '../types/Asset';
import { selectShowModal, showModal } from '../redux/modalReducer';
import { useSelector, useDispatch } from 'react-redux';
import { addAsset, getAssets, deleteAsset, updateAsset, unsub } from '../services/AssetService';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { SwipeListView } from 'react-native-swipe-list-view';
import { assetTypes, assetTypeIdEnum } from '../constants/AssetTypes';
import { Currency } from '../types/Currency';
import { styles, colorHighlight, openWidth, colorWhite } from '../styles/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { BlurView } from "@react-native-community/blur";

export default function Assets() {
const isDarkMode = useColorScheme() === 'dark';
const openModal = useSelector(selectShowModal);

const[uniqueId, setUniqueId] = useState("");
const [refreshing, setRefreshing] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [assets, setAssets] = useState<Array<Asset>>();
const [currencies, setCurrencies] = useState<Currency>();
const [assetTypeId, setAssetTypeId] = useState(1);
const [editingAssetId, setEditingAssetId] = useState('');
const [total, setTotal] = useState(0);
const dispatch = useDispatch();

useEffect(() => {
  getAssetData();
}, [refreshing]);

useEffect(() => {
  calculateTotal();
}, [assetTypeId]);

useEffect(() => {
  unsub((data: Currency) => {
    setCurrencies(data);
    calculateTotal();
  });
}, []);

const getAssetData = () => {
  DeviceInfo.getUniqueId().then((id) => {
      setUniqueId(id);
      let assets = getAssets(id);
      setAssets(assets);
      calculateTotal();
    });
}

const calculateTotal = () => {
  if(assetTypeId == null)
  return;
  let totalAmount = 0;
  assets?.forEach(item => {
    switch(item.AssetTypeId)
    {
        case assetTypeIdEnum.TRY:
            totalAmount += item.Amount;
        break;
        case assetTypeIdEnum.USD:
            totalAmount += (item.Amount * currencies?.buyingUsd!);
        break;
        case assetTypeIdEnum.EUR:
          totalAmount += (item.Amount * currencies?.buyingEur!);
        break;
        case assetTypeIdEnum.GBP:
          totalAmount += (item.Amount * currencies?.buyingGbp!);
        break;
        case assetTypeIdEnum.CHF:
          totalAmount += (item.Amount * currencies?.buyingChf!);
        break;
        case assetTypeIdEnum.CAD:
          totalAmount += (item.Amount * currencies?.buyingCad!);
        break;
        case assetTypeIdEnum.AUD:
          totalAmount += (item.Amount * currencies?.buyingAud!);
        break;
        case assetTypeIdEnum.GRAM:
          totalAmount += (item.Amount * currencies?.buyingGram!);
        break;
        case assetTypeIdEnum.CEYREK:
          totalAmount += (item.Amount * currencies?.buyingCeyrek!);
        break;
        case assetTypeIdEnum.YARIM:
          totalAmount += (item.Amount * currencies?.buyingYarim!);
        break;
        case assetTypeIdEnum.TAM:
          totalAmount += (item.Amount * currencies?.buyingTam!);
        break;
        case assetTypeIdEnum.CUMHURIYET:
          totalAmount += (item.Amount * currencies?.buyingCumhuriyet!);
        break;
        default:
          break;
    }
  });
  if(assetTypeId != assetTypeIdEnum.TRY)
  {
      switch(assetTypeId)
      {
        case assetTypeIdEnum.USD:
          totalAmount /= currencies?.buyingUsd!;
        break;
        case assetTypeIdEnum.EUR:
          totalAmount /= currencies?.buyingEur!;
        break;
        case assetTypeIdEnum.GBP:
          totalAmount /= currencies?.buyingGbp!;
        break;
        case assetTypeIdEnum.CHF:
          totalAmount /= currencies?.buyingChf!;
        break;
        case assetTypeIdEnum.CAD:
          totalAmount /= currencies?.buyingCad!;
        break;
        case assetTypeIdEnum.AUD:
          totalAmount /= currencies?.buyingAud!;
        break;
        case assetTypeIdEnum.GRAM:
          totalAmount /= currencies?.buyingGram!;
        break;
        case assetTypeIdEnum.CEYREK:
          totalAmount /= currencies?.buyingCeyrek!;
        break;
        case assetTypeIdEnum.YARIM:
          totalAmount /= currencies?.buyingYarim!;
        break;
        case assetTypeIdEnum.TAM:
          totalAmount /= currencies?.buyingTam!;
        break;
        case assetTypeIdEnum.CUMHURIYET:
          totalAmount /= currencies?.buyingCumhuriyet!;
        break;
      }
  }
  setTotal(totalAmount);
}

const handleDelete = (rowData: any, rowMap: any) => {
  Alert.alert(
    'Silme Onayı',
    'Silmek istediğinizden emin misiniz?',
    [
      { text: 'İptal', onPress: () => rowMap[rowData.item.ID].closeRow(), style: 'cancel' },
      {
        text: 'Tamam', onPress: () => {
          deleteAsset(uniqueId,rowData.item.ID);
          onRefresh();
        }
      },
    ]
  )
};

const handleEdit = (rowData: any, rowMap: any) => {
  setIsEditing(true);
  dispatch(showModal(true));
  setEditingAssetId(rowData.item.ID);
};

const onRefresh = useCallback(() => {
  setRefreshing(true);
  setTimeout(() => {
    setRefreshing(false);
  }, 500);
}, []);

const renderItem = ({ item, index }: ListRenderItemInfo<Asset>) => {
  return (
    <TouchableHighlight
      style={[styles.assetItem, styles.shadow]}
      underlayColor={colorHighlight}
      onPress={() => { }}>
      <View style={styles.assetItemView}>
        <View style={styles.assetItemNameView}>
          <Text style={styles.assetSymbol}>{item.Name}</Text>
          <Text style={styles.assetFullName}>{item.Symbol}</Text>
        </View>
        <View>
          <Text style={styles.assetValue}>{item.Amount}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const renderHiddenItem = (rowData: any, rowMap: any) => {
  return (
    <View style={styles.actionContainer}>
      <TouchableOpacity
        style={[styles.actionBtn, styles.editBtn]}
        onPress={() => handleEdit(rowData, rowMap)}>
        <FontAwesomeIcon size={28} style={{ color: colorWhite }} name='edit' />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionBtn, styles.deleteBtn]}
        onPress={() => handleDelete(rowData, rowMap)}>
        <FontAwesomeIcon size={28} style={{ color: colorWhite }} name='trash' />
      </TouchableOpacity>
    </View>
  );
};

const amountFormat = (value:number) => {
  let stringValue = value.toString();
  let index = stringValue.indexOf(".");
  return index != -1 ? stringValue.substring(0,index+3) : stringValue + ".00";
}

let assetPickerParam = {
  style: {
      backgroundColor: "transparent",
      color: "#fff",
      fontWeight: "700"
  },
  icon:{
    color: "#fff",
    backgroundColor: "transparent"
  }
}

  return (
    <>
    <SafeAreaView style={styles.mainContainer}>
        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#28ac49', "#1cb96a"]} style={styles.linearGradient}>
        </LinearGradient>
      <View style={[styles.balanceMainContainer]}>
      <View style={styles.addButtonView}>
          <Pressable onPress={() => dispatch(showModal(true))}>
                    {({ pressed }) => (
                      <Feather
                        name="plus-circle"
                        size={25}
                        color={colorWhite}
                        style={{ opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
              </Pressable>
        </View>
          <Text style={styles.balanceTitle}>Toplam Bakiyeniz</Text>
          <Text style={styles.balanceValue}>{amountFormat(total)} {assetTypes.filter(i=>i.key == assetTypeId)[0]?.symbol}</Text>
          <AssetPicker style={assetPickerParam.style} icon={assetPickerParam.icon} onChange={(value: number) => 
          {
            if(value)
            setAssetTypeId(value)
          }} />
      </View>
      <SwipeListView
        data={assets}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID}
        renderHiddenItem={renderHiddenItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        rightOpenValue={-openWidth}
        stopRightSwipe={-openWidth}
        disableRightSwipe={true}
        style={styles.swipeList}
      />
    </SafeAreaView>
    {openModal && <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={3}
        />}
    <Modal
        show={openModal}
        isEditMode={isEditing}
        onClose={() => {
          dispatch(showModal(false));
          setIsEditing(false);
        }
        }
        onSave={(assetTypeId: number, amount: number) => {
          if (assetTypeId) {
            addAsset(uniqueId, assetTypeId, amount);
          }
          else {
            updateAsset(uniqueId, editingAssetId, amount);
          }
          onRefresh();
          setIsEditing(false);
        }}
      />
  </>
  );
}