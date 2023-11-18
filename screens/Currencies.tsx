import React, { useState, useEffect } from 'react';
import { StyleSheet, useColorScheme, View, Text } from 'react-native';
import Colors from '../constants/Colors';
import { unsub } from '../services/AssetService';
import { Currency } from '../types/Currency';

export default function Currencies() {
const isDarkMode = useColorScheme() === 'dark';
const [currencies, setCurrencies] = useState<Currency>();

useEffect(() => {
  unsub((data: Currency) => {
    // console.log("Current data: ", data);
    setCurrencies(data);
  });
}, []);

  return (
    <View style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
        },
      ]}>
      <Text style={styles.title}>Kurlar</Text>
      <Text style={styles.title}>eur: {currencies?.buyingEur}</Text>
      <Text style={styles.title}>usd: {currencies?.buyingUsd}</Text>
      <Text style={styles.title}>gram: {currencies?.buyingGram}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#dfdfdf"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});