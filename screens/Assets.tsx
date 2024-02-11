import {
    SafeAreaView,
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
import React, { useState, useEffect } from 'react';

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
import { assetTypes, assetTypeIdEnum, assetTypeEnum } from '../constants/AssetTypes';
import { Currency } from '../types/Currency';
import { styles } from '../styles/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { BlurView } from "@react-native-community/blur";
import { showMessage } from "react-native-flash-message";
import Dimensions from '../constants/Dimensions';

export default function Assets() {
const isDarkMode = useColorScheme() === 'dark';
const openModal = useSelector(selectShowModal);

const[uniqueId, setUniqueId] = useState("");
const [refreshing, setRefreshing] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [assets, setAssets] = useState<Array<Asset>>();
const [currencies, setCurrencies] = useState<Currency>();
const [assetTypeId, setAssetTypeId] = useState<number|null>(null);
const [editingAssetId, setEditingAssetId] = useState('');
const [total, setTotal] = useState(0);
const dispatch = useDispatch();

useEffect(() => {
  if(refreshing)
  {
    calculateTotal();
  }
}, [refreshing]);

useEffect(() => {
  getAssetData();
}, [uniqueId]);

useEffect(() => {
  calculateTotal();
}, [currencies]);

useEffect(() => {
  calculateTotal();
}, [assets]);

useEffect(() => {
  calculateTotal();
}, [assetTypeId]);

useEffect(() => {
  DeviceInfo.getUniqueId().then((id) => {
      setUniqueId(id);
      getAssetData();
      if(!currencies?.updateDate)
      {
        unsub((data: Currency) => {
          setCurrencies(data);
          calculateTotal();
        });
      }
    });
},[]);

const getAssetData = () => {
  if(uniqueId)
  {
    let result = getAssets(uniqueId);
    setAssets(result);
  }
}

const calculateTotal = () => {
  if(assetTypeId == null)
  return;
  let totalAmount = 0;
  assets?.forEach(item => {
    if(item.AssetTypeId == assetTypeIdEnum.TRY)
    {
      totalAmount += item.Amount;
    }
    else
    {
      totalAmount += (item.Amount * currencies?.data.filter(i=>i.assetTypeId == item.AssetTypeId)[0].buying!);
    }
  });
  if(assetTypeId != assetTypeIdEnum.TRY)
  {
    totalAmount /= currencies?.data.filter(i=>i.assetTypeId == assetTypeId)[0].buying!;
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
        text: 'Tamam', onPress: async() => {
            await deleteAsset(uniqueId,rowData.item.ID, () => {
                deleteStateAsset(rowData.item.ID);    
                calculateTotal();
                showInfoMessage("Silme işlemi başarılı");
          });
        }
      },
    ]
  )
};

const deleteStateAsset = (id:string) => {
  let filteredAsset = assets?.filter(item => item.ID !== id);
  setAssets(filteredAsset);
}

const handleEdit = async(rowData: any, rowMap: any) => {
  setIsEditing(true);
  dispatch(showModal(true));
  setEditingAssetId(rowData.item.ID);
};

const updateStateAsset = (editingAssetId: string, amount: number) => {
  assets?.map((item) => {
    if(item.ID == editingAssetId)
      item.Amount = amount;
  });
}

const onRefresh = () => {
  if(!refreshing)
  {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }
};

const amountFormat = (value:number) => {
  let asset = assetTypes.filter(i=>i.key == assetTypeId)[0];
  if(asset?.type == assetTypeEnum.CURRENCY)
  {
    const formatter = new Intl.NumberFormat(asset.cultureCode, {
      style: 'currency',
      currency: asset.symbol.toUpperCase()
    });
    return formatter.format(value);  
  }
  else
  {
    let stringValue = value.toString();
    let index = stringValue.indexOf(".");
    return index != -1 ? stringValue.substring(0,index+5).concat(" ", asset.symbol) : stringValue + "";
  }
}

let assetPickerParam = {
  containerStyle:{
    justifyContent: "flex-start"
  },
  style: {
      backgroundColor: "transparent",
      color: Colors.light.textSecondary,
      fontWeight: "700",
      paddingLeft: 0
  },
  icon:{
    color: Colors.light.textSecondary,
    backgroundColor: "transparent"
  }
}

const showInfoMessage = (message: string) => {
  showMessage({
    message: message,
    position: "bottom",
    icon: "success",
    titleStyle: styles.successMessageTitle
  });
}

const renderItem = ({ item, index }: ListRenderItemInfo<Asset>) => {
  return (
    <TouchableHighlight
      style={[styles.assetItem, styles.shadow, isDarkMode ? styles.assetItemDark : styles.assetItemLight]}
      underlayColor={isDarkMode ? Colors.dark.highlight : Colors.light.highlight}
      onPress={() => {}}>
      <View style={styles.assetItemView}>
        <View style={styles.assetItemNameView}>
          <Text style={[styles.assetFullName, isDarkMode ? styles.assetFullNameDark : styles.assetFullNameLight]}>{item.Name}</Text>
          <Text style={[styles.assetSymbol, isDarkMode ? styles.assetSymbolDark : styles.assetSymbolLight]}>{item.Symbol.toUpperCase()}</Text>
        </View>
        <View>
          <Text style={[styles.assetValue, isDarkMode ? styles.assetValueDark : styles.assetValueLight]}>{item.Amount}</Text>
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
        <FontAwesomeIcon size={Dimensions.hiddenActionIconSize} style={{ color: Colors.light.textSecondary }} name='edit' />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionBtn, styles.deleteBtn]}
        onPress={() => handleDelete(rowData, rowMap)}>
        <FontAwesomeIcon size={Dimensions.hiddenActionIconSize} style={{ color: Colors.light.textSecondary }} name='trash' />
      </TouchableOpacity>
    </View>
  );
};

  return (
    <>
    <SafeAreaView style={[styles.mainContainer, isDarkMode ? styles.darkbg : styles.lightbg]}>
        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={isDarkMode ? [Colors.dark.balanceBackgroundPrimary, Colors.dark.balanceBackgroundSecondary] : [Colors.light.balanceBackgroundPrimary, Colors.light.balanceBackgroundSecondary]} style={[styles.linearGradient, styles.shadow, isDarkMode ? styles.linearGradientDark : styles.linearGradientLight]}>
          <View style={[styles.balanceMainContainer]}>
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceTitle}>Toplam Bakiyeniz</Text>
                <Text style={styles.balanceValue}>{amountFormat(total)}</Text>
                <AssetPicker containerStyle={assetPickerParam.containerStyle} style={assetPickerParam.style} icon={assetPickerParam.icon} isDarkMode={isDarkMode} 
                  onChange={(value: number) => 
                  {
                    if(value)
                    setAssetTypeId(value)
                  }} 
                />
            </View>
            <View style={styles.addButtonView}>
              <Pressable onPress={() => dispatch(showModal(true))}>
                        {({ pressed }) => (
                          <Feather
                            name="plus-circle"
                            size={25}
                            color={Colors.light.textSecondary}
                            style={{ opacity: pressed ? 0.5 : 1 }}
                          />
                        )}
                  </Pressable>
            </View>
          </View>
      </LinearGradient>
      <SwipeListView 
        data={assets}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID}
        renderHiddenItem={renderHiddenItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        rightOpenValue={-Dimensions.openWidth}
        stopRightSwipe={-Dimensions.openWidth}
        disableRightSwipe={true}
        style={styles.swipeList}
      />
    </SafeAreaView>
    {openModal && <BlurView style={styles.absolute} blurType="light" blurAmount={3} />}
    <Modal
        show={openModal}
        isEditMode={isEditing}
        isDarkMode={isDarkMode}
        onClose={() => {
          dispatch(showModal(false));
          setIsEditing(false);
        }
        }
        onSave={async (assetTypeId: number, amount: number) => {
          if(amount != 0)
          {
          if (assetTypeId) {
            await addAsset(uniqueId, assetTypeId, amount, (added:Asset) =>{
                setIsEditing(false);
                assets?.push(added);
                  calculateTotal();
                  showInfoMessage("Ekleme işlemi başarılı");
            });
          }
          else {
              await updateAsset(uniqueId, editingAssetId, amount, (updated:Asset) => {
                updateStateAsset(editingAssetId, amount);
                setIsEditing(false);
                setRefreshing(false);
                calculateTotal();
                showInfoMessage("Güncelleme işlemi başarılı");
              });
          }
          }
        }}
      />
  </>
  );
}