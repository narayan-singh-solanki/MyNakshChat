/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme } from 'react-native';

import AstroChatScreen from './screens/AstroChatScreen';
import { ChatProvider } from './context/ChatContext';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const NavigationStack = createNativeStackNavigator();

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ChatProvider>
        <NavigationContainer>
          <NavigationStack.Navigator>
            <NavigationStack.Screen name="AI Astrologer" component={AstroChatScreen} />
          </NavigationStack.Navigator>
        </NavigationContainer>
      </ChatProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});

export default App;
