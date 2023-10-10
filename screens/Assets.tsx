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
    useColorScheme
  } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';

import Colors from '../constants/Colors';
import DeviceInfo from 'react-native-device-info';
import AssetPicker from '../components/AssetPicker';
import Modal from '../components/Modal';
import { Asset } from '../types/Asset';
import { selectShowModal, showModal } from '../redux/modalReducer';
import { useSelector, useDispatch } from 'react-redux';
import { addAsset, getAssets, deleteAsset, updateAsset } from '../services/AssetService';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { SwipeListView } from 'react-native-swipe-list-view';

export const backButtonWidth = 75;
export const openWidth = backButtonWidth * 2;
export const fontSize = 16;
export const padding = 18;

export const colorBackground = '#ffffff';
export const colorText = '#000000';
export const colorHighlight = '#e5e5e5';
export const colorDanger = '#e91e63';
export const colorInfo = '#2196f3';
export const colorWarning = '#ffeb3b';
export const colorSuccess = '#4caf50';
export const colorDangerText = '#660000';
export const colorInfoText = '#0000cc';
export const colorWarningText = '#8e5500';
export const colorSuccessText = '#004c45';

export default function Assets() {
const isDarkMode = useColorScheme() === 'dark';
const openModal = useSelector(selectShowModal);

const[uniqueId, setUniqueId] = useState();
const [refreshing, setRefreshing] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [assets, setAssets] = useState<Array<Asset>>();
const [assetTypeId, setAssetTypeId] = useState('');
const [editingAssetId, setEditingAssetId] = useState('');
const dispatch = useDispatch();

useEffect(() => {
  const fetchData = async () => {
    let assets = await getAssets();
    setAssets(assets);
    DeviceInfo.getUniqueId().then((uniqueId) => {
      console.log("uniqueId",uniqueId);
      });
  }
  fetchData();
}, [refreshing]);

const handleDelete = (rowData: any, rowMap: any) => {
  Alert.alert(
    'Silme Onayı',
    'Silmek istediğinizden emin misiniz?',
    [
      { text: 'İptal', onPress: () => rowMap[rowData.item.ID].closeRow(), style: 'cancel' },
      {
        text: 'Tamam', onPress: () => {
          deleteAsset(rowData.item.ID);
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
      style={styles.rowFront}
      underlayColor={colorHighlight}
      onPress={() => { }}>
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <View style={{ flexGrow: 1 }}>
          <Text style={styles.frontText}>{item.Symbol}</Text>
          <Text style={styles.assetFullName}>{item.Name}</Text>
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
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.editBtn]}
        onPress={() => handleEdit(rowData, rowMap)}>
        <FontAwesomeIcon size={28} style={{ color: "#fff" }} name='edit' />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.dangerBtn]}
        onPress={() => handleDelete(rowData, rowMap)}>
        <FontAwesomeIcon size={28} style={{ color: "#fff" }} name='trash' />
      </TouchableOpacity>
    </View>
  );
};

  return (
    // <View style={[
    //     styles.container,
    //     {
    //       backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    //     },
    //   ]}>
    //   <Text style={styles.title}>Portföy</Text>
    // </View>
    <>
    <SafeAreaView style={{flex: 1}}>
      <View style={{ margin: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <AssetPicker onChange={(value: any) => setAssetTypeId(value)} />
        <Text style={{ fontSize: fontSize }}>1000 TRY</Text>
      </View>
      <SwipeListView
      style={{paddingBottom:100}}
        data={assets}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID}
        renderHiddenItem={renderHiddenItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        rightOpenValue={-openWidth}
        stopRightSwipe={-openWidth}
        disableRightSwipe={true}
      />
    </SafeAreaView>
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
            addAsset(assetTypeId, amount);
          }
          else {
            updateAsset(editingAssetId, amount);
          }
          onRefresh();
          setIsEditing(false);
        }}
      />
  </>
  );
}

const styles = StyleSheet.create({
  rowFront: {
    justifyContent: 'center',
    padding: padding,
    backgroundColor: colorBackground,
    borderBottomColor: colorHighlight,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  frontText: {
    color: colorText,
    fontSize: fontSize,
  },
  assetFullName: {
    fontSize: 13,
    marginTop: 5,
    color: "gray"
  },
  assetValue: {
    color: colorText,
    fontSize: 15
  },
  rowBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colorBackground,
    flexDirection: 'row',
    paddingHorizontal: padding,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: backButtonWidth,
  },
  dangerBtn: {
    backgroundColor: colorDanger,
    right: 0,
  },
  editBtn: {
    backgroundColor: colorInfo,
    right: backButtonWidth
  },
});