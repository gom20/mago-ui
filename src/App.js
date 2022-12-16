import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigations/AuthStack';


export default function App() {
  return (
    <NavigationContainer theme ={{colors:{background: 'skyblue'}}}>
      <AuthStack />
    </NavigationContainer>
  );
}
