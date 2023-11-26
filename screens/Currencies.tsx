import React, { useState, useEffect } from 'react';
import {SafeAreaView, useColorScheme, View, Text, FlatList} from 'react-native';
import Colors from '../constants/Colors';
import { unsub } from '../services/AssetService';
import { Currency, CurrencyItem } from '../types/Currency';
import { styles, colorHighlight, openWidth, colorWhite } from '../styles/globalStyles';
import { assetTypes } from '../constants/AssetTypes';

export default function Currencies() {
const isDarkMode = useColorScheme() === 'dark';
const [currencies, setCurrencies] = useState<Currency>();

useEffect(() => {
  unsub((data: Currency) => {
    setCurrencies(data);
  });
}, []);

const renderItem = (item:any) => {
  return (
   <>
      <View style={[styles.currencyMain, styles.shadow]}>
      <View style={[styles.currencyRenderItem]}>
        <View style={styles.currencyNameView}>
          <Text style={styles.currencyName}>{assetTypes.filter(i=>i.key == item.item.assetTypeId)[0]?.name}</Text>
          <Text style={styles.currencySymbol}>{assetTypes.filter(i=>i.key == item.item.assetTypeId)[0]?.symbol}</Text>
        </View>
        <View style={styles.currencyValueViewMain}>
        <View style={styles.currencyValueView}>
            <Text style={styles.currencyValueTitle}>Alış</Text>
            <Text style={styles.currencyValue}>{item.item.buying}</Text>
          </View>
          <View style={styles.currencyValueView}>
            <Text style={styles.currencyValueTitle}>Satış</Text>
            <Text style={styles.currencyValue}>{item.item.selling}</Text>
          </View>
        </View>
      </View>
      </View>
    </>
  );
};

  return (
   <>
    <SafeAreaView style={styles.mainContainer}>
        <FlatList data={currencies?.data} renderItem={renderItem} />
    </SafeAreaView>
    </>
  );
}