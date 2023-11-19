import React from 'react';
import { StyleSheet, Pressable, useColorScheme, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Assets from './screens/Assets';
import Currencies from './screens/Currencies';
import Colors from './constants/Colors';
import { selectShowModal, showModal } from './redux/modalReducer';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import { Host } from 'react-native-portalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { styles, tabBarActiveTintColor, tabBarInactiveTintColor } from './styles/globalStyles';
import FlashMessage from "react-native-flash-message";

function App(): JSX.Element {
  const Tab = createBottomTabNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  const modal = useSelector(selectShowModal);
  const dispatch = useDispatch();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Host>
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: styles.tabBarStyle,
            }}
          >
            <Tab.Screen name="Portföy" component={Assets}
              options={{
                title: 'Portföy',
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: tabBarActiveTintColor,
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarInactiveTintColor: tabBarInactiveTintColor,
                tabBarIcon: ({ color, size }) => <EntypoIcon name="wallet" size={size} color={color} />,
                headerRight: () => (
                  <Pressable onPress={() => dispatch(showModal(true))}>
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
                headerShown: false,
                tabBarShowLabel: true,
                title: 'Kurlar',
                tabBarActiveTintColor: tabBarActiveTintColor,
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarInactiveTintColor: tabBarInactiveTintColor,
                tabBarIcon: ({ color, size }) => <FontAwesomeIcon name="exchange" size={size} color={color} />
              }} />
          </Tab.Navigator>
        </Host>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const ReduxProvider = () => {
  return (
    <Provider store={Store}>
      <App />
      <FlashMessage />  
    </Provider>
  )
}

export default ReduxProvider;
