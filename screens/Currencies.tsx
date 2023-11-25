import React, { useState, useEffect } from 'react';
import { StyleSheet,SafeAreaView, useColorScheme, View, Text, TouchableHighlight,ListRenderItemInfo, FlatList, StatusBar} from 'react-native';
import Colors from '../constants/Colors';
import { unsub } from '../services/AssetService';
import { Currency } from '../types/Currency';
import { styles, colorHighlight, openWidth, colorWhite } from '../styles/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import { SwipeListView } from 'react-native-swipe-list-view';
import { assetTypes } from '../constants/AssetTypes';

export default function Currencies() {
const isDarkMode = useColorScheme() === 'dark';
const [currencies, setCurrencies] = useState<Currency>();

useEffect(() => {
  unsub((data: Currency) => {
    console.log("Current data: ", data);
    setCurrencies(data);
  });
}, []);

const renderItem = () => {
  for (const [key, value] of Object.entries(currencies!)) {
    console.log(`${key}: ${value}`);
  }
  return (
   <>
      <View style={[styles.currencyMain, styles.shadow]}>
      <View style={[styles.currencyRenderItem]}>
        <View style={styles.currencyNameView}>
          <Text style={styles.currencySymbol}>Amerikan Doları</Text>
          <Text style={styles.currencyName}>USD</Text>
        </View>
        <View style={styles.currencyValueViewMain}>
        <View style={styles.currencyValueView}>
            <Text style={styles.currencyValueTitle}>Alış</Text>
            <Text style={styles.currencyValue}>{currencies?.buyingUsd}</Text>
          </View>
          <View style={styles.currencyValueView}>
            <Text style={styles.currencyValueTitle}>Satış</Text>
            <Text style={styles.currencyValue}>{currencies?.sellingUsd}</Text>
          </View>
        </View>
      </View>
      </View>
    </>
  );
};

  return (
   <>
   {/* <View style={{height:"15%", backgroundColor: "#28ac49"}}>
        <StatusBar translucent barStyle="light-content" />
    </View> */}
  {/* <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#28ac49', "#1cb96a"]} style={styles.currencyLinearGradient}>
  </LinearGradient> */}
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        data={[currencies]}
        renderItem={() => renderItem()}
      />
    </SafeAreaView>
    </>
  );
}