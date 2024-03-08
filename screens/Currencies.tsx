import React, { useState, useEffect } from 'react';
import {SafeAreaView, useColorScheme, View, Text, FlatList} from 'react-native';
import { unsub } from '../services/AssetService';
import { Currency } from '../types/Currency';
import { styles } from '../styles/globalStyles';
import { assetTypes } from '../constants/AssetTypes';

export default function Currencies() {
const isDarkMode = useColorScheme() === 'dark';
const [currencies, setCurrencies] = useState<Currency>();
const accessibilityLanguage = "tr-TR";

useEffect(() => {
  unsub((data: Currency) => {
    setCurrencies(data);
  });
}, []);

const renderItem = (item:any) => {
  return (
   <>
      <View style={[styles.currencyMain, styles.shadow, isDarkMode ? styles.assetItemDark : styles.assetItemLight]}>
      <View style={[styles.currencyRenderItem]}>
        <View style={styles.currencyNameView}>
          <Text style={[styles.currencyName, isDarkMode ? styles.assetFullNameDark : styles.assetFullNameLight]}>{assetTypes.filter(i=>i.key == item.item.assetTypeId)[0]?.name}</Text>
          <Text style={[styles.currencySymbol, isDarkMode ? styles.assetSymbolDark : styles.assetSymbolLight]}>{assetTypes.filter(i=>i.key == item.item.assetTypeId)[0]?.symbol.toUpperCase()}</Text>
        </View>
        <View style={styles.currencyValueViewMain}>
        <View style={styles.currencyValueView}>
            <Text style={[styles.currencyValueTitle, isDarkMode ? styles.assetFullNameDark : styles.assetFullNameLight]}>Alış</Text>
            <Text style={[styles.currencyValue, isDarkMode ? styles.assetValueDark : styles.assetValueLight]}>{item.item.buying}</Text>
          </View>
          <View style={styles.currencyValueView}>
            <Text style={[styles.currencyValueTitle, isDarkMode ? styles.assetFullNameDark : styles.assetFullNameLight]}>Satış</Text>
            <Text style={[styles.currencyValue, isDarkMode ? styles.assetValueDark : styles.assetValueLight]}>{item.item.selling}</Text>
          </View>
        </View>
      </View>
      </View>
    </>
  );
};

  return (
   <>
    <SafeAreaView 
          style={[styles.mainContainer, isDarkMode ? styles.darkbg : styles.lightbg]}
          accessible={true}
          accessibilityHint='Bu ekranda güncel döviz ve altın kurları listeleniyor'
          accessibilityLanguage={accessibilityLanguage}>
        <FlatList data={currencies?.data} renderItem={renderItem} />
    </SafeAreaView>
    </>
  );
}