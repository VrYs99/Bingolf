import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { RootStackParamList } from './src/navigation/types';
import { AchievementsScreen } from './src/screens/AchievementsScreen';
import { GameScreen } from './src/screens/GameScreen';
import { LobbyScreen } from './src/screens/LobbyScreen';
import { NewGameScreen } from './src/screens/NewGameScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Lobby"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            contentStyle: { backgroundColor: '#0E4741' },
          }}
        >
          <Stack.Screen name="Lobby" component={LobbyScreen} />
          <Stack.Screen name="NewGame" component={NewGameScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Achievements" component={AchievementsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}