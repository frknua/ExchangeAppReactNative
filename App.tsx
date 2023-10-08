import React from 'react';
import { StyleSheet, Pressable, useColorScheme, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Assets from './screens/Assets';
import Currencies from './screens/Currencies';
import Colors from './constants/Colors';

function App(): JSX.Element {
  const Tab = createBottomTabNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        <Tab.Screen name="Portföy" component={Assets}
          options={{
            title: 'Portföy',
            tabBarIcon: ({ color, size }) => <EntypoIcon name="wallet" size={size} color={color} />,
            headerRight: () => (
              // <Pressable onPress={()=>dispatch(showModal(true))}>
              <Pressable onPress={()=>Alert.alert("asd")}>
                {({ pressed }) => (
                  <EntypoIcon
                    name="plus"
                    size={25}
                    color={isDarkMode ? Colors.dark.tint : Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
          ),
          }} />
        <Tab.Screen name="Kurlar" component={Currencies}
          options={{
            title: 'Kurlar',
            tabBarIcon: ({ color, size }) => <FontAwesomeIcon name="exchange" size={size} color={color} />
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    paddingBottom: 10, 
    paddingTop: 10, 
    height: 70
  }
});

export default App;
