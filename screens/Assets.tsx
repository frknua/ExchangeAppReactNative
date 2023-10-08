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

export const fontSize = 16;

export default function Assets() {
const isDarkMode = useColorScheme() === 'dark';

const[uniqueId, setUniqueId] = useState();
const [assetTypeId, setAssetTypeId] = useState('');

useEffect(() => {

      
      DeviceInfo.getUniqueId().then((uniqueId) => {
        console.log("uniqueId",uniqueId);
        setUniqueId(uniqueId);
        });
    
  }, []);


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
    <SafeAreaView>
      <View style={{ margin: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <AssetPicker onChange={(value: any) => setAssetTypeId(value)} />
        <Text style={{ fontSize: fontSize }}>1000 TRY</Text>
      </View>
      {/* <SwipeListView
        data={assets}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID}
        renderHiddenItem={renderHiddenItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        rightOpenValue={-openWidth}
        stopRightSwipe={-openWidth}
        disableRightSwipe={true}
      /> */}
    </SafeAreaView>
    <Modal
        show={false}
        // isEditMode={isEditing}
        // onClose={() => {
        //   dispatch(showModal(false));
        //   setIsEditing(false);
        // }
        // }
        // onSave={(assetTypeId: number, amount: number) => {
        //   if (assetTypeId) {
        //     addAsset(assetTypeId, amount);
        //   }
        //   else {
        //     updateAsset(editingAssetId, amount);
        //   }
        //   onRefresh();
        //   setIsEditing(false);
        // }}
      />
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});