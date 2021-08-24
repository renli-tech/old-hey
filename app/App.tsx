import { StatusBar } from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { colors } from './theme';

const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    'Cereal-Light': require('./assets/fonts/AirbnbCerealLight.ttf'),
    'Cereal-Bold': require('./assets/fonts/AirbnbCerealBold.ttf'),
    'Cereal-Medium': require('./assets/fonts/AirbnbCerealMedium.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' backgroundColor={colors[500]} />
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
